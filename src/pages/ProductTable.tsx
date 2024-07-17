'use client'
import { PRODUCTS } from "@/src/data/dataset"
import { columns, pagination, columnVisibility } from "../components/table/columns"
import { DataTable } from "../components/table/data-table"

const ProductTable = () => {
    const data = PRODUCTS;
    return (

        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} pagination={pagination} columnVisibility={columnVisibility} />
        </div>
    );
};

export default ProductTable;


