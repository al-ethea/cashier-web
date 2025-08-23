'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ITransactionReport, ITransactionReportMonthly } from '@/types/report.type';
import { ColumnDef } from '@tanstack/react-table';

export const monthlyTransactionColumns = (): ColumnDef<ITransactionReportMonthly>[] => [
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
      style: { textAlign: 'left' }, // Override center alignment
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
    accessorKey: 'date',
    header: 'Transaction Date',
    size: 50,
    meta: {
      textAlign: 'left', // Add this
    },
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>
          {row.original.date
            ? new Date(row.original.date)
                .toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'Asia/Jakarta',
                })
                .replace(',', '')
            : 'N/A'}{' '}
        </div>
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'Total Transaction',
    size: 50,
    cell: ({ row }) => {
      const amount = row.original.totalAmount || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className='text-center font-medium bg-blue-100'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'total_transaction_count',
    header: 'Transaction Count',
    size: 50,
    cell: ({ row }) => {
      return <div className='text-center font-medium'>{row.original.transactionCount || 0}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      <div className='px-2 py-1 size-fit bg-purple-800 text-white text-sm cursor-pointer'>Action</div>;
    },
  },
];
