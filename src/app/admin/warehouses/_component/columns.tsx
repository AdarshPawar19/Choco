import { Product, Warehouse } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Warehouse>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'pincode',
        header: 'Pincode',
    },
];