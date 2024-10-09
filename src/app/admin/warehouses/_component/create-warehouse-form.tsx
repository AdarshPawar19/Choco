import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { warehouseSchema } from '@/lib/validators/warehouseSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type WarehouseFormValues=z.input<typeof warehouseSchema>

type WareHouseFormProps={
    onSubmit:(formValues:WarehouseFormValues)=>void
    disabled:boolean
}

function CreateWarehouseForm({onSubmit,disabled}:WareHouseFormProps) {

    const form=useForm<z.input<typeof warehouseSchema>>({
        defaultValues:{
            name:"",
            pincode:""
        },
        resolver:zodResolver(warehouseSchema),
        mode:"all"
    })
    
    function handleSubmit(values:WarehouseFormValues){
        onSubmit(values);
    }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Chocobar " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
           control={form.control}
           name="pincode"
           render={({ field }) => (
             <FormItem>
             <FormLabel>Pincode</FormLabel>
             <FormControl>
                <Input placeholder="e.g. 406876" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
        />
        <Button type="submit" className='w-full' disabled={disabled}>
            {disabled ? <Loader2 className='size-4 animate-spin'/> : "Create"}
        </Button>
      </form>
    </Form>
    </>
  )
}

export default CreateWarehouseForm
