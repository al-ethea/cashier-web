'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { IProduct } from '@/types/product.type';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { EditCashierModal } from '../../cashiers/components/edit-cashier-modal';
import { EditProductModal } from './edit-product-modal';
import DeleteModal from '@/components/delete-modal';
import { ProductImageCell } from '@/components/product-image-cell';


export const productColumns=(onRefresh?: () => void, onDelete?:(id:string,password?:string)=>void): ColumnDef<IProduct>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    size: 30,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Product',
    size: 300,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-3'>
          <ProductImageCell
            src={row.original.productImgUrl}
            alt={row.original.name}
            className='rounded-md object-cover'
          />
          <div className='font-medium break-words'>{row.original.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'productCategory.name',
    header: 'Category',
    cell: ({ row }) => {
      return <div className='text-left font-medium'>{row.original.productCategory?.name || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 100,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price')) || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <EditProductModal id={row.original.id} onRefresh={onRefresh} />
          <DeleteModal
                      id={row.original.id}
                      deleteContext='Product'
                      className='px-2 py-1 flex items-center gap-1 bg-red-500 text-white rounded-sm'
                      onDelete={(password?: string)=> onDelete?.(row.original.id, password)}
                      onRefresh={onRefresh}
                    />
        </div>
      );
    },
  },
];
