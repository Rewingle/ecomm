import { useParams } from 'next/navigation'
import React from 'react'
import { getProduct } from '@/actions/get-products'

type Props = {}

const Product = async({ params }: { params: { id: string } }) => {
   /*  const params = useParams() */
   const product = await getProduct(params.id)
    return (
        <div>
            <div>Product</div>
            <div>{product?.name}</div>
        </div>
    )
}

export default Product