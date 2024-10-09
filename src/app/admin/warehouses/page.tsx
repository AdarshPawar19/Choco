"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import WarehouseSheet from './_component/warehouse-sheet'
import { useNewWareHouse } from '@/store/warehouse/warehouse-store'
import { useQuery } from '@tanstack/react-query'
import { getAllWarehouses } from '@/http/api'
import { Loader2 } from 'lucide-react'
import { columns } from './_component/columns'
import { Product, Warehouse } from '@/types'
import { DataTable } from './_component/data-table'

function WarehousePage() {
    const {onOpen}=useNewWareHouse();
    const {data : warehouses,isFetching,isError}=useQuery<Warehouse[]>({
        queryKey:["warehouses"],
        queryFn:getAllWarehouses
    })
  return (
    <>
        <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Warehouses</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Warehouse
                </Button>
                <WarehouseSheet />
        </div>

        {isError && <span className="text-red-500">Something went wrong.</span>}

        {isFetching ?  <div><Loader2 className="size-10 animate-spin" /></div> : (
                <DataTable columns={columns} data={warehouses || []} />
        )}
    </>
  )
}

export default WarehousePage
