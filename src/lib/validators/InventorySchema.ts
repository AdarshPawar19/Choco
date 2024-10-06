import { z } from "zod";

export const inventorySchema=z.object({
    sku:z.string({message:"SKU name should be a string"}).length(8 ,"SKU should be 8 chars long"),
    warehouseId:z.number({message:"warehouseId should be number"}),
    productId:z.number({message:"productId should be number"})
})