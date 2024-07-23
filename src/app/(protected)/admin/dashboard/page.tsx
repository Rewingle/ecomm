import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    return (
        <div>
            <div className="flex justify-center items-center py-2">
                <Link href='/admin/addproduct'><Button>ADD TO PRODUCT</Button></Link>
            </div>
            <Link href={'/admin/dashboard/products'}>
                <Button>PRODUCTS</Button>
            </Link>

        </div>
    )
}
export default Dashboard