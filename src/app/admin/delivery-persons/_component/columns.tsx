import { DeliveryOutput, Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<DeliveryOutput>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'warehouse',
        header: 'Warehouse',
    }
];