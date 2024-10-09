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