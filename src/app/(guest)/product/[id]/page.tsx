import React from 'react'
import { getProduct } from '@/actions/get-products'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart } from 'lucide-react';
import { FaHeart ,FaRegHeart } from "react-icons/fa";

type Props = {}

const Product = async ({ params }: { params: { id: string } }) => {
    /*  const params = useParams() */
    const product = await getProduct(params.id)
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

            </div>
            <div className="row-span-4 col-span-6 pr-24">
                <div>{product ? product.description : <Skeleton className="h-24 w-[700px]" />}</div>
            </div>
            <div className='flex items-center justify-end row-span-2 col-span-6 size-full'>
                <FaRegHeart className='mr-8 size-8 text-red-500'/>
                <Button className='px-6 py-6 flex items-center'><ShoppingCart className='mr-4'/> ADD TO CART</Button>
            </div>
        </div>
    )
}

export default Product