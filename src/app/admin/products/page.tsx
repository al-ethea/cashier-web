'use client';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { productColumns } from './components/product-columns';
import { ProductDataTable } from './components/product-data-table';

export default function ProductsPage() {
  const { allProducts: data, fetchAllProducts, handleDeleteProduct } = useAdminProducts();

  return (
    <div className='h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Products</h2>
          <p className='text-muted-foreground'>Products' List</p>
        </div>
        <div className='flex items-center gap-2'>{/* <UserNav /> */}</div>
      </div>
      <ProductDataTable
        columns={productColumns(fetchAllProducts, handleDeleteProduct)}
        data={data}
        onRefresh={fetchAllProducts}
      />
    </div>
  );
}
