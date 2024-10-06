import { z } from "zod";

export const deliveryPersonsSchema=z.object({
    name:z.string({message:"Delivery Person name should be a string"}),
    phone:z.string({message:"Phone should be string"}).length(13,"Delivery person's phone number should be 13 character long"),
    warehouseId:z.number({message:"Warehouse ID should be number only"})
})