"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import  {DataTable}  from './data-table'
import { columns } from './columns'


function Products() {
  return (
   <>
    <div className='flex items-center justify-between'>
      <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
      <Button size={"sm"}>Add Product</Button>
    </div>
    <DataTable columns={columns} data={[]}/>
   </>
  )
}

export default Products
