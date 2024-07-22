"use client"
import * as React from "react"
import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/react-table"

import { Product } from "../../data/ProductDefinition";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

interface DataTableProps {
    columns: ColumnDef<Product, any>[];
    categoryToProducts: { [category: string]: Product[] };
    selectedCategory: string;
    pagination: { pageSize: number };
    columnVisibility: { [key: string]: boolean };
}


export const DataTable = ({
    columns,
    categoryToProducts,
    pagination,
    columnVisibility,
    selectedCategory
}: DataTableProps) => {
    const data = categoryToProducts[selectedCategory] || []; // Fallback to an empty array if no category matches

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // needed for client-side filtering
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: pagination,
            columnVisibility: columnVisibility,

        }
    })

    // Function to reset filter input value
    const handleResetFilter = () => {
        console.log("handleResetFilter called")
        table.getColumn("name")?.setFilterValue("");
    };

    return (

        < div >

            <div className="flex items-center py-4">
                <Input
                    placeholder="Search items..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilter} // Call handleResetFilter on button click
                    className="ml-2 bg-orange-100 hover:bg-orange-200 focus:bg-orange-300"
                >
                    Clear Filter
                </Button>
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
                    <TableBody key={selectedCategory}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (

                                <TableRow
                                    key={`${row.id}-${selectedCategory}`}
                                    data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => {
                                        const numericId = parseInt(row.id, 10);
                                        if (!isNaN(numericId) && numericId % 10 === 0) {
                                            console.log(`Rendering cell ${cell.id} in row ${row.id}`);
                                        }

                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center space-x-2 py-4 justify-between">

                <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 bg-orange-100 hover:bg-orange-200 focus:bg-orange-300"

                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                {table.getPageCount() > 0 && (
                    <p className="text-sm md:text-base lg:text-sm leading-relaxed text-center">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 bg-orange-100 hover:bg-orange-200 focus:bg-orange-300"

                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div >
    )
}

