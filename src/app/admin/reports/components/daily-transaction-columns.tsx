'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ITransactionReport } from '@/types/report.type';
import { ColumnDef } from '@tanstack/react-table';

export const dailyTransactionColumns = (): ColumnDef<ITransactionReport>[] => [
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
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-3'>
          <div className='font-medium break-words'>{row.original.id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Transaction Date',
    size: 100,
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>
          {row.original.createdAt
            ? new Date(row.original.createdAt)
                .toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'Asia/Jakarta',
                })
                .replace(',', '')
            : 'N/A'}{' '}
        </div>
      );
    },
  },
  {
    accessorKey: 'cashier_name',
    header: 'Cashier',
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>
          {row.original.cashier?.firstName + ' ' + row.original.cashier?.lastName || 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'cashier_shift',
    header: 'Shift',
    size: 70,
    cell: ({ row }) => {
      return (
        <div
          className={
            'w-fit px-1.5 py-0.5 rounded-sm text-xs font-semibold text-white ' +
            (row.original.cashier?.shift === 'SHIFT1'
              ? 'bg-lime-700'
              : row.original.cashier?.shift === 'SHIFT2'
              ? 'bg-red-700'
              : 'bg-gray-400')
          }>
          {row.original.cashier?.shift || 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Transaction',
    size: 100,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('totalAmount')) || 0;
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className='text-center font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'payment_type',
    header: 'Payment',
    size: 70,
    cell: ({ row }) => {
      return (
        <div
          className={
            'flex !items-center !justify-center w-fit px-1.5 py-0.5 rounded-sm text-xs font-semibold text-white ' +
            (row.original.paymentType === 'CASH'
              ? 'bg-lime-700'
              : row.original.paymentType === 'DEBIT'
              ? 'bg-red-700'
              : 'bg-gray-400')
          }
          >
          {row.original.paymentType || 'N/A'}
        </div>
      );
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
