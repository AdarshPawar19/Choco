import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useNewDeliveryPerson } from '@/store/deliveryPerson/deliveryPerson-store';
import React from 'react'
import CreateInventoryForm, { DeliveryPersonValue } from './create-inventory-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeliveryPersonData } from '@/http/api';
import { useToast } from '@/hooks/use-toast';

function InventorySheet() {
    const {isOpen,onClose}=useNewDeliveryPerson();
    const {toast}=useToast()
    const queryClient=useQueryClient();
    const{mutate, isPending}=useMutation({
        mutationKey:["delivery-persons"],
        mutationFn:(data:DeliveryPersonValue)=>createDeliveryPersonData(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["delivery-persons"]});
            toast({
                title:"Delivery Person data created successfully"
            })
            onClose()
        }
    })

    const sendData=(value:DeliveryPersonValue)=>{
        mutate(value)
    }

  return (
    <>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Delivery Person</SheetTitle>
                    <SheetDescription>Create a new delivery person</SheetDescription>
                </SheetHeader>
                <CreateInventoryForm onSubmit={sendData} disabled={isPending}/>
            </SheetContent>
        </Sheet>
    </>
  )
}

export default InventorySheet
