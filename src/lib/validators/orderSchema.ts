import { z } from "zod";

export const orderSchema=z.object({
       productId:z.number({message:"Product should be a number"}),
       pincode:z.string({message:"Pincode should be string"}).length(6,"Pincode should be of 6 char length"),
       qty:z.number({message:"Quantity should be a number"}),
       address:z.string({message:"Address should be string"}).min(5,"Address should of length atleast 5 char long") 
})