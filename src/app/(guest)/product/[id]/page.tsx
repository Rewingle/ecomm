import React from 'react'
import { getProduct } from '@/actions/get-products'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Heart from '@/components/heart';
import Link from 'next/link';

type Props = {}

const Product = async ({ params }: { params: { id: string, favorite?: string } }) => {

    const result = await getProduct(params.id)
    const product = result.data
    const isFavorite:boolean = Boolean(params.favorite)
    return (
        <div className="grid grid-rows-12 grid-cols-12 gap-x-20 h-full">
            <div className="row-span-12 col-span-6 bg-white h-full">
                <img src={product?.image} alt={product?.name} className="h-full w-full object-cover" />
            </div>
            <div className="row-span-3 col-span-6 pr-24">
                <div>
                    <div className="font-bold text-2xl">
                        {product ? product.name : <Skeleton className="h-8 w-[700px]" />}
                    </div>
                    <div className="font-mono text-xl">
                        {product ? `${product?.price} $` : <Skeleton className="h-8 w-[80px] mt-2" />}
                    </div>
                    <br />
                    <div>
                        {product?.sizes.map((size: any) => (
                            <span className="ml-4 *:first-of-type:ml-0 *:last-of-type:ml:0">
                                <Button disabled={size?.stock > 0 ? false : true} className=" text-gray-900 bg-white border-gray-300 border-2">
                                    <div>{size?.name}</div>
                                </Button>
                            </span>
                        ))}
                    </div>
                </div>
            {params?.favorite?.toString()}
            </div>
            <div className="row-span-4 col-span-6 pr-24">
                <div>{product ? product.description : <Skeleton className="h-24 w-[700px]" />}</div>
            </div>
            {product ? <div className='flex items-center justify-end row-span-2 col-span-6 size-full'>
                <Heart productId={product.id} isFavorite={isFavorite}/>

                <Button className='px-6 py-6 flex items-center'><ShoppingCart className='mr-4' /> ADD TO CART</Button>
            </div> : null}
        </div>
    )
}

export default Product