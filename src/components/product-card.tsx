import React from 'react'
import { Card } from './ui/card'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardType {
    id: string,
    name: string
    price: number
    image: string
    rating: number
}

/* const RatingStars = (props: { rating: number }) => {
    return (
        <div className='flex'>
            {Array.from({ length: 5 }, (_, i) => {
                if (i < props.rating) {
                    return <span key={i} className='text-yellow-500'>★</span>
                } else {
                    return <span key={i} className='text-gray-500'>★</span>
                }
            })}
        </div>
    )

}
 */
const ProductCard = (props: ProductCardType) => {
    const { id, name, image, price, rating } = props
    return (
        <Link href={'/product/' + id}>
            <div className='w-full h-82 hover:cursor-pointer hover:bg-slate-50'>
                <div className='h-4/5 w-full'>
                    <Image src={image} alt={name} width={128} height={256} className='w-full h-full' />
                </div>
                <div className='h-1/5'>
                    <div className='text-md font-bold text-gray-800 flex justify-start px-2 hover:underline hover:cursor-pointer'>{name}</div>
                    <div className='w-full flex'>
                        <div className='text-lg font-mono text-gray-800 flex justify-start w-full px-2'>${price}.00</div>
                    </div>

                </div>

            </div>
        </Link>
    )
}

export default ProductCard