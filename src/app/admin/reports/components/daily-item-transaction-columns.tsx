'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ITransactionReportItemsDaily } from '@/types/report.type';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const dailyItemsTransactionColumns = (): ColumnDef<ITransactionReportItemsDaily>[] => [
  {
    id: 'select',

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='mx-2'
      />
    ),
    size: 30,
    meta: {
      style: { textAlign: 'left' },
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='text-left mx-2'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'product',
    header: 'Product',
    meta: {
      style: { textAlign: 'center' },
    },
    size: 150,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-3'>
          <Image
            src={row.original.product?.productImgUrl || '/placeholder.png'}
            alt={row.original.product?.name || 'N/A'}
            width={50}
            height={50}
            className='rounded-md object-cover'
          />
          <div className='font-medium break-words'>{row.original.product?.name || 'N/A'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    meta: {
      style: { textAlign: 'center' },
    },
    size: 50,
    cell: ({ row }) => {
      return <div className='text-center font-medium'>{row.original.product?.productCategory.name || 0}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: {
      style: { textAlign: 'center' },
    },
    size: 50,
    cell: ({ row }) => {
      const amount = row.original.product?.price || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'sold',
    header: 'Item Sold',
    meta: {
      style: { textAlign: 'center' }, // Override center alignment
    },
    size: 50,
    cell: ({ row }) => <div className='text-center font-medium'>{row.original.totalQuantitySold || 0}</div>,
  },
  {
    accessorKey: 'revenue',
    header: 'Item Revenue',
    meta: {
      style: { textAlign: 'center' }, // Override center alignment
    },
    size: 50,
    cell: ({ row }) => {
      const amount = row.original.totalRevenue || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'transaction',
    header: 'Transaction Count',
    size: 80,
    cell: ({ row }) => <div className='text-center font-medium'>{row.original.transactionCount || 0}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      <div className='px-2 py-1 size-fit bg-purple-800 text-white text-sm cursor-pointer'>Action</div>;
    },
  },
];
