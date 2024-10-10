import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Product, Warehouse } from '@/types';
import { getAllProducts, getAllWarehouses } from '@/http/api';
import { inventorySchema } from '@/lib/validators/InventorySchema';


export type InventoryValue=z.input<typeof inventorySchema>

type InventoryProps={
    onSubmit:(value : InventoryValue)=>void,
    disabled:boolean
}

function CreateInventoryForm({onSubmit,disabled} : InventoryProps) {

    const form=useForm<z.input<typeof inventorySchema>>({
        defaultValues:{
            sku:"",
            
        },
        resolver:zodResolver(inventorySchema),
        // mode:"all"
    })

    const sendData=(value:InventoryValue)=>{
        onSubmit(value)
    }
  
    const {data: warehouses,isLoading:isLoadingForWarehouse} = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: () => getAllWarehouses(),
    });

    const {data: products,isLoading:isLoadingForProduct} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(sendData)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. CH123456" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="warehouseId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Warehouse ID</FormLabel>
                            <Select
                                // Here onValueChange takes value as string compulsory
                                onValueChange={(value:string) => field.onChange(parseInt(value))}
                                // here defaultValue and normal value for warehuse both MUST be string otherwise we recieve complaint 
                                defaultValue={String(field.value)}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Warehouse ID" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingForWarehouse ? (
                                        <SelectItem value="Loading">Loading...</SelectItem>
                                    ) : (
                                        <>
                                            {warehouses &&
                                                warehouses.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        // here value must be string only!!
                                                        value={item.id ? item.id?.toString() : ''}>
                                                        {item.name}
                                                    </SelectItem>
                                            ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                    <FormField
                    control={form.control}
                    name="productId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product</FormLabel>
                            <Select
                                onValueChange={(value:any) => field.onChange(parseInt(value))}
                                defaultValue={field.value ? field.value.toString() : ''}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select product " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingForProduct ? (
                                        <SelectItem value="Loading">Loading...</SelectItem>
                                    ) : (
                                        <>
                                            {products &&
                                                products.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id ? item.id?.toString() : ''}>
                                                        {item.name}
                                                    </SelectItem>
                                            ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" disabled={disabled}>
                    {disabled ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
                </Button>
            </form>
        </Form>
    );
}

export default CreateInventoryForm
