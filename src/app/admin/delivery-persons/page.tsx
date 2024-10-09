"use client"
import { Button } from '@/components/ui/button'
import { useNewDeliveryPerson } from '@/store/deliveryPerson/deliveryPerson-store'
import React from 'react'
import DeliveryPersonSheet from './_component/delivery-person-sheet';
import { useQuery } from '@tanstack/react-query';
import { getAllDeliveryPersonData } from '@/http/api';
import { Loader2 } from 'lucide-react';
import { columns } from './_component/columns';
import { DeliveryOutput, Product } from '@/types';
import { DataTable } from './_component/data-table';


function DeliveryPersonPage() {

    const {onOpen}=useNewDeliveryPerson();

    const {data :deliveryPersons  , isFetching , isError}=useQuery<DeliveryOutput[]>({
        queryKey:["delivery-persons"],
        queryFn:getAllDeliveryPersonData
    })
  return (
    <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Delivery Person
                </Button>
                <DeliveryPersonSheet />
            </div>
            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isFetching ?  <div><Loader2 className="size-10 animate-spin" /></div> : (
                <DataTable columns={columns} data={deliveryPersons  || []} />
            )}
    </>
  )
}

export default DeliveryPersonPage
