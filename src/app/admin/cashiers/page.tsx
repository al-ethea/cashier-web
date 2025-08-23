'use client';
import { cashierColumns } from './components/cashier-columns';
import { CashierDataTable } from './components/cashier-data-table';
import useAdminCashiers from '@/features/admin/cashiers/useAdminCashiers';
import React from 'react';

export default function CashiersPage() {
  const {
    allCashiers: data,
    totalItems,
    fetchAllCashiers,
    handleDeleteCashier,
    pageSizeVariants,
    pageNumber,
    pageSize,
    handlePageChange,
    handleNewPageSizeChange,
    isLoading,
    searchFilterValue,
    handleSearchFilterChange,
    columnsToSearch,
  } = useAdminCashiers();

  const memoColumns = React.useMemo(() => cashierColumns(fetchAllCashiers, handleDeleteCashier), [fetchAllCashiers, handleDeleteCashier]);
  const memoData = React.useMemo(() => data, [data]);

  return (
    <div className='h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Cashiers</h2>
          <p className='text-muted-foreground'>Cashiers' List</p>
        </div>
        <div className='flex items-center gap-2'>{/* <UserNav /> */}</div>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      ) : (
        <CashierDataTable
          columns={memoColumns}
          data={memoData}
          filteringType='backend'
          onRefresh={fetchAllCashiers}
          totalItems={totalItems}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          pageSizeVariants={pageSizeVariants}
          pageSize={pageSize}
          onPageSizeChange={handleNewPageSizeChange}
          searchValue={searchFilterValue}
          onSearchFilterChange={handleSearchFilterChange}
          searchableColumns={columnsToSearch}
        />
      )}
    </div>
  );
}
