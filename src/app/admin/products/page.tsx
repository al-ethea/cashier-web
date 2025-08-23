'use client';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { productColumns } from './components/product-columns';
import { ProductDataTable } from './components/product-data-table';
import React from 'react';

export default function ProductsPage() {
  const {
    allProducts: data,
    totalItems,
    fetchAllProducts,
    handleDeleteProduct,
    pageSizeVariants,
    pageNumber,
    pageSize,
    handlePageChange,
    handleNewPageSizeChange,
    isLoading,
    searchFilterValue,
    handleSearchFilterChange,
    columnsToSearch,
  } = useAdminProducts();

  const memoColumns = React.useMemo(
    () => productColumns(fetchAllProducts, handleDeleteProduct),
    [fetchAllProducts, handleDeleteProduct]
  );
  const memoData = React.useMemo(() => data, [data]);

  return (
    <div className='h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Products</h2>
          <p className='text-muted-foreground'>Products' List</p>
        </div>
        <div className='flex items-center gap-2'>{/* <UserNav /> */}</div>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      ) : (
      <ProductDataTable
          columns={memoColumns}
          data={memoData}
          filteringType='backend'
        onRefresh={fetchAllProducts}
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
