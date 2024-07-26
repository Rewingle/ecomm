"use client"
import { useParams, useSearchParams } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import React from 'react'
import Link from 'next/link'

type Props = {
    productId: string
    isFavorite: boolean
}

const Heart = (props: Props) => {
    const searchParams = useSearchParams()
    const createQueryString = (key: string, value: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, String(value))

        return String(params)
    }
    return (
        <Link href={`/product/${props.productId}?${createQueryString('favorite', 'true')}`}>
            <div className='p-2 rounded-full hover:cursor-pointer hover:bg-pink-50 mr-4 flex items-center justify-center'>
                {props.isFavorite?<FaHeart className='size-8 text-red-500' />: <FaRegHeart className='size-8 text-red-500' />}
            </div>
        </Link>
    )
}

export default Heart;