'use client';
import { cashierColumns } from './components/cashier-columns';
import { CashierDataTable } from './components/cashier-data-table';
import { EditCashierModal } from './components/edit-cashier-modal';
import useAdminCashiers from '@/features/admin/cashiers/useAdminCashiers';

export default function ProductsPage() {
 const { allCashiers: data,fetchAllCashiers, handleDeleteCashier } = useAdminCashiers();

  return (
    <div className='h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Cashiers</h2>
          <p className='text-muted-foreground'>Cashiers' List</p>
        </div>
        <div className='flex items-center gap-2'>{/* <UserNav /> */}</div>
      </div>
      <CashierDataTable columns={cashierColumns(fetchAllCashiers, handleDeleteCashier)} data={data} onDelete={handleDeleteCashier} onRefresh={fetchAllCashiers} />
    </div>
  );
}
