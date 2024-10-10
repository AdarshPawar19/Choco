export interface Product{
    id:number,
    name:string,
    image:string,
    price:number
}

export interface Warehouse {
    id?: number;
    name: string;
    pincode: string;
}


export interface DeliveryOutput{
    id:number,
    name:string,
    phone:string,
    warehouse:string
}

export interface InventoryOutput{
    id:number,
    sku:string,
    warehouse:string,
    product:string
}

export interface SingleProductOutput{
    id:string,
    name:string,
    image:string,
    description:string,
    price:number,
    updatedAt:Date,
    createdAt:Date
}