import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import React from 'react'
import CreateInventoryForm, { InventoryValue } from './create-inventory-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  createInventoryData } from '@/http/api';
import { useToast } from '@/hooks/use-toast';
import { useNewInventorieState } from '@/store/inventoreis/inventory-store';

function InventorySheet() {
    const {isOpen,onClose}=useNewInventorieState();
    const {toast}=useToast()
    const queryClient=useQueryClient();
    const{mutate, isPending}=useMutation({
        mutationKey:["inventories"],
        mutationFn:(data:InventoryValue)=>createInventoryData(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["inventories"]});
            toast({
                title:"Inventory created successfully"
            })
            onClose()
        }
    })

    const sendData=(value:InventoryValue)=>{
        mutate(value)
    }

  return (
    <>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Inventory</SheetTitle>
                    <SheetDescription>Create a new inventory </SheetDescription>
                </SheetHeader>
                <CreateInventoryForm onSubmit={sendData} disabled={isPending}/>
            </SheetContent>
        </Sheet>
    </>
  )
}

export default InventorySheet
