"use client";

import * as React from "react";
import useCashierProducts from "@/features/cashier/products/useCashierProducts";
import { ProductDataTable } from "@/app/admin/products/components/product-data-table";
import { cashierProductColumns } from "./components/cashier-product-columns";

export default function CashierProductsPage() {
  const { allProducts, fetchAllProducts, addToCart, loading } =
    useCashierProducts();

  return (
    <div className="h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Select products to add to cart
          </p>
        </div>
      </div>

      <ProductDataTable
        columns={cashierProductColumns(addToCart)}
        data={allProducts}
        onRefresh={fetchAllProducts}
      />
    </div>
  );
}
