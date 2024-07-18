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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: { pageSize: number, }
    columnVisibility: { [key: string]: boolean }
}




export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    columnVisibility
}: DataTableProps<TData, TValue>) {
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
        table.getColumn("name")?.setFilterValue("");
    };

    React.useCallback(() => {
        console.log("resetting filter")
        // Reset the input value when the component mounts
        table.getColumn("name")?.setFilterValue("");
    }, []); // Empty dependency array ensures this effect runs only once
    { console.log("Load table"); }
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (

                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
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

            <div className="flex items-center justify-end space-x-2 py-4">
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
        </div >
    )
}
