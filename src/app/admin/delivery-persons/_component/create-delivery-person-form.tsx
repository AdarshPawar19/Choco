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
import { deliveryPersonsSchema } from '@/lib/validators/deliveryPersonSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Warehouse } from '@/types';
import { getAllWarehouses } from '@/http/api';


export type DeliveryPersonValue=z.input<typeof deliveryPersonsSchema>

type DeliverypersonProps={
    onSubmit:(value : DeliveryPersonValue)=>void,
    disabled:boolean
}

function CreateDeliveryPersonForm({onSubmit,disabled} : DeliverypersonProps) {

    const form=useForm<z.input<typeof deliveryPersonsSchema>>({
        defaultValues:{
            name:"",
            phone:"",
            warehouseId:0
        },
        resolver:zodResolver(deliveryPersonsSchema),
        mode:"all"
    })

    const sendData=(value:DeliveryPersonValue)=>{
        onSubmit(value)
    }
  
    const {data: warehouses,isLoading} = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: () => getAllWarehouses(),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(sendData)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. +918899889988" {...field} />
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
                                onValueChange={(value:any) => field.onChange(parseInt(value))}
                                defaultValue={field.value ? field.value.toString() : ''}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Warehouse ID" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoading ? (
                                        <SelectItem value="Loading">Loading...</SelectItem>
                                    ) : (
                                        <>
                                            {warehouses &&
                                                warehouses.map((item) => (
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

export default CreateDeliveryPersonForm
