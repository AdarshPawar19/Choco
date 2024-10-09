import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'pincode',
        header: 'Pincode',
    },
];