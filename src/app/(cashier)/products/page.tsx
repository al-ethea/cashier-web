"use client";
import useAdminProducts from "@/features/admin/products/useAdminProducts";
import { ProductDataTable } from "@/app/admin/products/components/data-table";
import { productColumns } from "@/app/admin/products/components/columns";
export default function ProductsPage() {
  const { allProducts: data } = useAdminProducts();

  return (
    <div className="h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Products' List</p>
        </div>
        <div className="flex items-center gap-2">{/* <UserNav /> */}</div>
      </div>
      <ProductDataTable columns={productColumns} data={data} />
    </div>
  );
}
