"use client";

import * as React from "react";
import useCashierProducts from "@/features/cashier/products/hooks/useCashierProducts";
import { Button } from "@/components/ui/button";
import { Loader2, PackageX, Search } from "lucide-react";
import CashierProductCard from "./components/cashier-product-card";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchFilter from "@/hooks/filter-tools/useSearchFilter";

export default function CashierProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { searchFilterValue, handleSearchFilterChange, isSearching } =
    useSearchFilter({
      searchRouter: router,
      searchParams,
      columnsToSearch: ["name"],
    });
  const { allProducts, addToCart, loading, page, setPage } =
    useCashierProducts(searchParams);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Cashier POS - Products</h1>

        {/* Search bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchFilterValue}
            onChange={(e) => handleSearchFilterChange(e.target.value)}
            placeholder="Search products..."
            className="w-full border rounded-lg pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {(isSearching || loading) && (
            <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-gray-400" />
          )}
        </div>
      </div>

      {loading && allProducts.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <PackageX className="w-10 h-10 mb-2" />
          <p className="text-sm">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.map((product) => (
            <CashierProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="self-center">Page {page}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// "use client";

// import * as React from "react";
// import useCashierProducts from "@/features/cashier/products/hooks/useCashierProducts";
// import { ProductDataTable } from "@/app/admin/products/components/product-data-table";
// import { cashierProductColumns } from "./components/cashier-product-columns";

// export default function CashierProductsPage() {
//   const { allProducts, fetchAllProducts, addToCart, loading } =
//     useCashierProducts();

//   return (
//     <div className="h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md">
//       <div className="flex items-center justify-between gap-2">
//         <div className="flex flex-col gap-1">
//           <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
//           <p className="text-muted-foreground">
//             Select products to add to cart
//           </p>
//         </div>
//       </div>

//       <ProductDataTable
//         columns={cashierProductColumns(addToCart)}
//         data={allProducts}
//         onRefresh={fetchAllProducts}
//       />
//     </div>
//   );
// }
