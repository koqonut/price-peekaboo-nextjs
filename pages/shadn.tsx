import { PRODUCTS } from "@/data/dataset"
import { Product, columns } from "../components/table/columns"
import { DataTable } from "../components/table/data-table"




const DemoPage = () => {
    const data = PRODUCTS;

    return (

        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default DemoPage;


