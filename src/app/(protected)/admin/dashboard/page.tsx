import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    return (
        <div>
            <Link href={'/admin/dashboard/products'}>
                <Button>PRODUCTS</Button>
            </Link>
        </div>
    )
}
export default Dashboard