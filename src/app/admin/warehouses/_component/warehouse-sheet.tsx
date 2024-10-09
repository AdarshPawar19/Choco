import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useNewWareHouse } from '@/store/warehouse/warehouse-store'
import React from 'react'
import CreateWarehouseForm, { WarehouseFormValues } from './create-warehouse-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWarehouse } from '@/http/api';
import { Warehouse } from '@/types';
import { useToast } from '@/hooks/use-toast';

function WarehouseSheet() {

    const {isOpen,onClose}=useNewWareHouse();
    const {toast}=useToast()
    const queryClient= useQueryClient();

    const {mutate , isPending}= useMutation({
        mutationKey:["warehouses"],
        mutationFn:(data:Warehouse)=>createWarehouse(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["warehouses"]});
            toast({
                title:"Warehouse created successfully"
            })
            onClose()
        }
    })

    const onSubmit =(values:WarehouseFormValues)=>{
       // mutate({id:Date.now(),...values});
       mutate(values as Warehouse)
    }

  return (
<>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Warehouse</SheetTitle>
                    <SheetDescription>Create a new warehouse</SheetDescription>
                </SheetHeader>
                <CreateWarehouseForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
</>
  )
}

export default WarehouseSheet
