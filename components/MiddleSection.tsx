// components/MiddleSection.tsx

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PRODUCTS } from '../data/dataset';

const MiddleSection = () => {
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Category',
            accessor: 'category',
        },
        {
            Header: 'Price',
            accessor: 'price',
        },
        {
            Header: 'Last Updated',
            accessor: 'lastUpdatedDate',
        },
        {
            Header: 'Store',
            accessor: 'store',
        },
        {
            Header: 'City',
            accessor: 'city',
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>{
                        columns.map((column) => (
                            <TableHead key={column.Header} className="w-[100px]">
                                {column.Header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {PRODUCTS.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>

                            <TableCell>{product.store}</TableCell>
                            <TableCell>{product.city}</TableCell>
                            <TableCell>{product.lastUpdatedDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total records</TableCell>
                        <TableCell className="text-right">{PRODUCTS.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default MiddleSection;
