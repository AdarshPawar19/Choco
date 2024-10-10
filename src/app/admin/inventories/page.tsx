"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import InventorySheet from './_component/inventory-sheet';
import { useQuery } from '@tanstack/react-query';
import {  getAllInventories } from '@/http/api';
import { Loader2 } from 'lucide-react';
import { columns } from './_component/columns';
import { DeliveryOutput, InventoryOutput, Product } from '@/types';
import { DataTable } from './_component/data-table';
import { useNewInventorieState } from '@/store/inventoreis/inventory-store';


function InventoriesPage() {

    const {onOpen}=useNewInventorieState();

    const {data :inventories  , isFetching , isError}=useQuery<InventoryOutput[]>({
        queryKey:["inventories"],
        queryFn:getAllInventories
    })
  return (
    <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Inventory
                </Button>
                <InventorySheet />
            </div>
            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isFetching ?  <div><Loader2 className="size-10 animate-spin" /></div> : (
                <DataTable columns={columns} data={inventories  || []} />
            )}
    </>
  )
}

export default InventoriesPage
