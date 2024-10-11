import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { deliveryPersons, inventories, orders, products, warehouses } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/orderSchema";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request:Request) {
    //get session
    const session=await getServerSession(authOptions);
    console.log("session ",session);

    if(!session){
        return Response.json({message:"Not allowed"},{status:401}) 
    }

    //validate request body
    const requestedData=request.json();
    let validateData;
    try {
        validateData= orderSchema.parse(requestedData);
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    //order creation

    const warehouseResult=await db
    .select({id:warehouses.id})
    .from(warehouses)
    .where(eq(warehouses.pincode,validateData.pincode));

    if(!warehouseResult.length){
        return Response.json({message:"No warehouse found"},{status:400})
    }

    const foundProduct=await db
    .select()
    .from(products)
    .where(eq(products.id,validateData.productId))
    .limit(1);

    if(!foundProduct.length){
        return Response.json({message:"No product found"},{status:400})
    }

    let transactionError:string="";
    let finalOrder:any=null;
    try {
         finalOrder =await db.transaction(async(tx)=>{
            //create order
            const order=await tx
            .insert(orders)
            .values({...validateData,
                //@ts-ignore
                userId:session.token.id ,
                price:foundProduct[0].price * validateData.qty,
                //TODO: Move all status to either enum or const
                status:"received"
            }).returning({id:orders.id ,price:orders.price})

            //check stock
            const availableStock=await tx
            .select()
            .from(inventories)
            .where(and(
                eq(inventories.warehouseId,warehouseResult[0].id),
                eq(inventories.productId,validateData.productId),
                isNull(inventories.orderId)
            )).limit(validateData.qty).for("update" ,{skipLocked:true});

            if(availableStock.length<validateData.qty){
                transactionError=`Stock is low , only ${availableStock.length} product(s) available.`;
                tx.rollback();
                return;
            }

            //check delivery person availability
            const availablePersons=await tx.select()
            .from(deliveryPersons)
            .where(
                and(
                    isNull(deliveryPersons.orderId),
                    eq(deliveryPersons.warehouseId,warehouseResult[0].id)
                )
            ).for("update").limit(1);

            if(!availablePersons.length){
                transactionError=`Delivery person is not available at the moment.`;
                tx.rollback();
                return;
            }

            //stock is available and deliveryperson is available

            //update inventories table and add ordeer_id
            await tx.update(inventories)
            .set({orderId:order[0].id})
            .where(
                inArray(inventories.id,availableStock.map(stock=>stock.id))
            )

            //update deliveryPerson 
            await tx.update(deliveryPersons)
            .set({orderId:order[0].id}).
            where(
                eq(deliveryPersons.id,availablePersons[0].id)
            )

            //update order
            await tx.update(orders)
            .set({status:'reserved'})
            .where(
                eq(orders.id,order[0].id)
            )

        
            return order[0];
        })
    } catch (error) {
        //log
        // in Production : be careful don't return internal error to client , better to log the error but dont show  on client
        return Response.json({message:transactionError ? transactionError : "Error while db transaction."} ,{status:500})
    }

    //payment
    //create invoice
}