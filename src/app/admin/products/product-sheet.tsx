import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import CreateProductForm, { FormValues } from './create-product-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/http/api'
import { useNewProduct } from '@/store/product/product-store'
import { useToast } from '@/hooks/use-toast'

function ProductSheet() {
    const {isOpen,onClose}=useNewProduct()
    const queryClient =useQueryClient()
    const { toast } = useToast()
    const {mutate ,isPending}=useMutation({
        mutationKey:['createProduct'],
        mutationFn:(data:FormData) =>createProduct(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']}),
            toast({
                title:"Product created successfully"
            })
            onClose()
        }
    })

    const onSubmit=(values : FormValues)=>{
        const formData=new FormData();
        formData.append("name",values.name)
        formData.append("description",values.description)
        formData.append("price",String(values.price))
        formData.append("image",(values.image as FileList)[0])

        mutate(formData)
    }
  return (
    <>
<Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent className='min-w-[28rem] space-y-4'>
    <SheetHeader>
      <SheetTitle>Create Product</SheetTitle>
      <SheetDescription>
        Create a new Product
      </SheetDescription>
    </SheetHeader>
    <CreateProductForm onSubmit={onSubmit} disabled={isPending}/>
    </SheetContent>
</Sheet>

    </>
  )
}

export default ProductSheet
