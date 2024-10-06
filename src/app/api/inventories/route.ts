import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/InventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request) {
    const requestData=await request.json();
    let validatedData;
    try {
        validatedData= inventorySchema.parse(requestData);
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {
        await db.insert(inventories).values(validatedData);
        return Response.json({message:"OK"},{status:201});
    } catch (error) {
        return Response.json({message:"Failed to store inventory in db."},{status:500})
    }
}

export async function GET() {
    try {
       const allInventories= await db.select({
        id:inventories.id,
        sku:inventories.sku,
        warehouse:warehouses.name,
        product:products.name
       }).from(inventories)
       .leftJoin(warehouses,eq(inventories.warehouseId,warehouses.id))
       .leftJoin(products,eq(inventories.productId,products.id))
       .orderBy(desc(inventories.id));

       return Response.json(allInventories);

    } catch (error) {
        return Response.json({message:"Failed to fetch inventories"},{status:500})
    }
}