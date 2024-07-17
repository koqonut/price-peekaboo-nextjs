// components/MiddleSection.tsx

import {
    DataTable
} from './table/data-table';
import { PRODUCTS } from '../data/dataset';
import { columns } from './table/columns';

const MiddleSection = () => {

    return (
        <div className="p-4">
            <DataTable columns={columns} data={PRODUCTS}></DataTable>
        </div>
    );
};

export default MiddleSection;
