'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ICashier } from '@/types/cashier.type';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { EditCashierModal } from './edit-cashier-modal';

import DeleteModal from '@/components/delete-modal';

export const cashierColumns = (onRefresh?: () => void, onDelete?:(id:string,password?:string)=>void): ColumnDef<ICashier>[] => [
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
    id: 'cashier',
    header: 'Cashier',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-3'>
          <Image
            src={row.original.avatarImgUrl || '/placeholder.png'}
            alt={row.original.firstName + ' ' + row.original.lastName}
            width={50}
            height={50}
            className='rounded-md object-cover'
          />
          <div className='font-medium break-words'>{row.original.firstName + ' ' + row.original.lastName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'E-Mail',
    cell: ({ row }) => {
      return <div className='text-left font-medium'>{row.original.email}</div>;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => {
      return <div className='text-left font-medium'>{row.original.phoneNumber}</div>;
    },
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      return <div className='text-left font-medium'>{row.original.gender}</div>;
    },
  },
  {
    accessorKey: 'shift',
    header: 'Shift',
    cell: ({ row }) => {
      return (
        <div
          className={
            'w-fit px-1.5 py-0.5 rounded-sm text-xs font-semibold text-white ' +
            (row.original.shift === 'SHIFT1'
              ? 'bg-lime-700'
              : row.original.shift === 'SHIFT2'
              ? 'bg-red-700'
              : 'bg-gray-400')
          }>
          {row.original.shift || 'No Shift'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <EditCashierModal id={row.original.id} onRefresh={onRefresh} />
          <DeleteModal
            id={row.original.id}
            deleteContext='Cashier'
            className='px-2 py-1 flex items-center gap-1 bg-red-500 text-white rounded-sm'
            onDelete={(password?: string)=> onDelete?.(row.original.id, password)}
            onRefresh={onRefresh}
          />
        </div>
      );
    },
  },
];
