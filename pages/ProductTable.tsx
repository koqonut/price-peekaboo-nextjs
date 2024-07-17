'use client'
import { PRODUCTS } from "@/data/dataset"
import { columns } from "../components/table/columns"
import { DataTable } from "../components/table/data-table"

const ProductTable = () => {
    const data = PRODUCTS;
    return (

        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default ProductTable;


