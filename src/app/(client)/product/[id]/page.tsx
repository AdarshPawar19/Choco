"use client"
import { getSingleProduct } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation'
import React from 'react'
import Header from '../../_component/header';
import Image from 'next/image';
import { SingleProductOutput } from '@/types';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { TypeOf, z } from 'zod';
import { orderSchema } from '@/lib/validators/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type RouteParams={
    id:string
}

function SingleProduct() {

    const params=useParams<RouteParams>();
    
    const{data:product ,isLoading:isLoadingForSingleProduct}= useQuery<SingleProductOutput>({
        queryKey:["products",params.id],
        queryFn:()=>getSingleProduct(params.id)
    })

    type ProductInput=z.infer<typeof orderSchema>

    const form =useForm<ProductInput>({
        defaultValues:{
            address:"",
            pincode:"",
            qty:1,
            productId:Number(params.id)
        },
        resolver:zodResolver(orderSchema)
    })

    const onsubmit=(value:ProductInput)=>{
        //submit the form
        console.log(value);
        
    }

  return (
    <>
      <Header/>
      <section className='custom-height relative bg-[#f5f5f5]'>
        <div className="z-50 mx-auto flex h-full max-w-6xl gap-x-10 px-5 py-14 md:py-20">
            <div>
                {isLoadingForSingleProduct ?   
                <Skeleton className="aspect-square w-[28rem] bg-brown-100"/>
                :<Image
                //TODO:convert jpeg into svg for image optimization
                src={`/assets/${product?.image}`}
                alt={product?.name || "images"}
                width={300} 
                height={300} 
                //izes="100vw"
                style={{ width: "28rem" }}
                className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                priority={true}
            />
            }
            </div>
            {isLoadingForSingleProduct ? <>
                <div className="flex flex-1 flex-col gap-y-2">
                            <Skeleton className="h-4 w-16 bg-brown-100" />
                            <Skeleton className="h-10 w-2/3 bg-brown-100" />
                            <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-0.5">
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" />
                                </div>
                                <span className="text-sm">144 Reviews</span>
                            </div>
                            <Skeleton className="mt-2 h-28 w-full bg-brown-100" />
                            <Separator className="my-6 bg-brown-900" />
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-10 w-28 bg-brown-100" />
                                <Skeleton className="h-10 w-40 bg-brown-100" />
                            </div>
                        </div>
            </>:<>
            <div>
            <h1 className="text-sm tracking-widest text-brown-500">BRAND NAME</h1>
            <h2 className="text-4xl font-semibold text-brown-900">
                {product?.name}
            </h2>
            {/* //TODO:Star wale chizo ko badme db se krne ki koshish karenge */}
            <div className="flex items-center gap-x-3">
               <div className="flex items-center gap-x-0.5">
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" fill="#facc15" />
                <Star className="size-4 text-yellow-400" />
              </div>
                <span className="text-sm">144 Reviews</span>
            </div>
            <p className="mt-1">{product?.description}</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className='flex gap-x-2 mt-2'>
                    <FormField 
                        control={form.control}
                        name='address'
                        render={({field})=>{
                        return <FormItem className='w-3/6'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea 
                                className="border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                                placeholder="e.g. Open street, 55" 
                                // value={field.onChange}
                                {...field}/>
                            </FormControl>
                            <FormMessage 
                            className='text-xs'
                            />
                        </FormItem>
                        }}
                    />
                    <FormField 
                        control={form.control}
                        name='pincode'
                        render={({field})=>{
                        return <FormItem className='w-3/6 '>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                            <Input
                            type="number"
                            className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                            placeholder="e.g. 567987"
                            {...field}
                            />
                            </FormControl>
                            <FormMessage 
                            className='text-xs'
                            />
                        </FormItem>
                        }}
                    />
                    <FormField 
                        control={form.control}
                        name='qty'
                        render={({field})=>{
                        return <FormItem className='w-3/6 '>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                            <Input
                            type="number"
                            className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                            placeholder="e.g. 1"
                            {...field}
                            />
                            </FormControl>
                            <FormMessage 
                            className='text-xs'
                            />
                        </FormItem>
                        }}
                    />  
                    </div>
                    <Separator className='my-6 bg-brown-900' />
                    <div className='flex items-center justify-between'>
                        <span className='text-3xl font-semibold'>$50</span>
                        <Button type='submit' style={{width:"160px"}}>Buy Now</Button>
                    </div>
                </form>
            </Form>
            </div>
            </>}
           
        </div>
      </section>
    </>
  )
}

export default SingleProduct
