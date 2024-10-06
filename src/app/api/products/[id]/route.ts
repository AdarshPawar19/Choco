import { db } from "@/lib/db/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

type ProductId ={
   id:string
}
export async function GET(request:Request,{params}:{params:ProductId}) {
    const id=params.id
    try {
        const product=await db.select().from(products).where(eq(products.id,Number(id))).limit(1);
        if(!product.length){
            return Response.json({message:"Product not found"},{status:400});
        }
        return Response.json(product[0]);
    } catch (error) {
        return Response.json({message:"Failed to fetch a product"})
    }
    
}