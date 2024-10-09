import { Product, Warehouse } from "@/types";
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

export const getAllWarehouses=async() :Promise<Product[]> =>{
    const response =await api.get<Product[]>("/warehouses");
    return response.data;
}

export const createWarehouse  =async (data:Warehouse)=>{
    const response=await api.post('/warehouses',data);
    return response.data;
}