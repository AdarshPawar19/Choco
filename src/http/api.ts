import { DeliveryOutput, InventoryOutput, Product, Warehouse } from "@/types";
import { api } from "./client"
import { DeliveryPersonValue } from "@/app/admin/delivery-persons/_component/create-delivery-person-form";

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

export const getAllWarehouses=async() :Promise<Warehouse[]> =>{
    const response =await api.get<Warehouse[]>("/warehouses");
    return response.data;
}

export const createWarehouse  =async (data:Warehouse)=>{
    const response=await api.post('/warehouses',data);
    return response.data;
}

export const getAllDeliveryPersonData =async():Promise<DeliveryOutput[]>=>{
    const response =await api.get<DeliveryOutput[]>("/delivery-persons");
    return response.data;
}

export const createDeliveryPersonData =async(data:DeliveryPersonValue)=>{
    const response=await api.post('/delivery-persons',data);
    return response.data;
}

export const getAllInventories=async():Promise<InventoryOutput[]>=>{
    const response =await api.get<InventoryOutput[]>("/inventories");
    return response.data;
}