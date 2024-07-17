"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

/*
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
*/


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: number
    category: string
    price: string
    name: string
    store: string
    city: string
    lastUpdatedDate: string
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "category",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "store",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Store
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "city",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    City
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastUpdatedDate",
        header: "Last Updated Date",
    },
    /*
   {
       id: "actions",
      
       cell: ({ row }) => {
           const product = row.original

           return (
               <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                       <Button variant="ghost" className="h-8 w-8 p-0">
                           <span className="sr-only">Open menu</span>
                           <MoreHorizontal className="h-4 w-4" />
                       </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="end">
                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
                       <DropdownMenuItem
                           onClick={() => navigator.clipboard.writeText(product.name)}
                       >
                           Copy payment ID
                       </DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem>View customer</DropdownMenuItem>
                       <DropdownMenuItem>View payment details</DropdownMenuItem>
                   </DropdownMenuContent>
               </DropdownMenu>
           )
       },
   },
   */
]