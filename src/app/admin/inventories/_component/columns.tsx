import {  InventoryOutput } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<InventoryOutput>[] = [
    {
        accessorKey: 'sku',
        header: 'SKU',
    },
    {
        accessorKey: 'warehouse',
        header: 'Warehouse',
    },
    {
        accessorKey: 'product',
        header: 'Product',
    }
];