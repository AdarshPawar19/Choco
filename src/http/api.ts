import { Product } from "@/types";
import { api } from "./client"

export const getAllProducts =async () : Promise<Product[]>=>{
    const response =await api.get<Product[]> ("/products");
    return  response.data
}

export const createProduct=async(data : FormData)=>{
    const response=await api.post('/products',data,{
        headers:{
            "Content-type":"multipart/form-data",
        }
    });
    return response.data;
}