"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { FaStar, FaRegStar } from "react-icons/fa6";
import { updateProductFeatured } from '@/actions/update-product';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2, CircleMinus, Star } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllProducts } from '@/actions/get-products';
import { toast } from 'sonner';
import { actionResponse } from '@/app/types';

type Product = {
    id: string
    sku: string
    name: string
    description: string
    category: string
    color: string
    price: number
    image: string
    stock: number
    sizes: { name: string; stock: number }[],
    featured: boolean,
    isActive: boolean
}

const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div>{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div>{(row.getValue("color"))}</div>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <div className='size-full text-center'>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("price"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-center font-medium">{formatted}</div>
        },

    },
    {
        accessorKey: "image",
        header: () => <div className="text-center">Image</div>,
        cell: ({ row }) => {

            return <div className=" flex items-center justify-center">
                <Image alt='product-small-image' width={32} height={32} src={(row.getValue("image"))} />
            </div>
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

        cell: ({ row }) => {

            return <div className="lowercase text-center">{row.getValue("stock")}</div>
        },
    },
    {
        id: "actions",
        accessorKey: "Featured",
        enableHiding: false,
        cell: ({ row }) => {
            const productId = row.original.id
            console.log('PRODUCCTT IDDD', productId)
            const [isFeatured, setIsFeatured] = useState<boolean>(row.original.featured)
            console.log('FEATURED', isFeatured)
            /* const [productId, setProductId] = useState<string>(row.getValue("id")) */
            return (
                <div className='flex items-center justify-center hover:cursor-pointer'>
                    {isFeatured ?
                        <FaStar className='w-5 h-5 mr-2' onClick={() => {
                            updateProductFeatured(productId, false).then((data) => {
                                console.log(data)
                                if (data.success) {
                                    toast.success(row.original.name + ' removed from featured')
                                    setIsFeatured(false)
                                }
                            }).catch((error) => {
                                toast.error('Error updating product featured field:', error)
                                console.log(error)
                            })
                        }}
                        />
                        :
                        <FaRegStar className='w-5 h-5 mr-2' onClick={() => {
                            updateProductFeatured(productId, true).then((data) => {
                                console.log(data)
                                if (data.success) {
                                    toast.success(row.original.name + ' added to featured')
                                    setIsFeatured(true)
                                }
                            }).catch((error) => {
                                toast.error('Error updating product featured field:', error)
                                console.log(error)
                            })
                        }} />}
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{row.getValue("name")}</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='hover:cursor-pointer'><CircleMinus className='w-4 h-4 mr-2' /> De-Activate </DropdownMenuItem>
                            <DropdownMenuItem className='hover:cursor-pointer'><Trash2 className='w-4 h-4 mr-2' /> Remove </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

const ProductsDashboard = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [Products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = async () => {
            getAllProducts([0, -1]).then((res) => {
                if (!res.success) {
                    console.log(res.message)
                } if (
                    res.data
                ) {
                    setProducts({...res.data, sizes: JSON.parse(res.data.sizes)})
                }
            })
            /*    type Product = {
                   id: string
                   sku: string
                   name: string
                   description: string
                   category: string
                   color: string
                   price: number
                   image: string
                   stock: number
                   sizes: { name: string; stock: number }[],
                   featured: boolean
               } */

            /*  if (!getAllProductsResult.success) {
                 console.log(getAllProductsResult.message)
             }
             setProducts(getAllProductsResult.data) */
            /*   return getAllProductsResult.data */
        }
        getProducts()
    }, [])


    const table = useReactTable({
        data: Products, // Provide a value for the 'data' property
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className='w-4/5'>
            <Link href={'/admin/addproduct'}> <Button>ADD PRODUCT</Button> </Link>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <div>{columnFilters.toString()}</div>
        </div>
    )
}


export default ProductsDashboard

