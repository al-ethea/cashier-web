// features/cashier/cart/CashierCartTable.tsx
"use client";

import { ICartItem } from "@/types/cart.type";
import { Button } from "@/components/ui/button";

interface Props {
  items: ICartItem[];
  onRemove?: (cartItemId: string) => void;
  onIncrease?: (
    cartItemId: string,
    productId: string,
    action: "increase"
  ) => void;
  onDecrease?: (
    cartItemId: string,
    productId: string,
    action: "decrease"
  ) => void;
  onRefresh?: () => void;
  onCheckout?: () => void;
}

export default function CashierCartTable({
  items,
  onRemove,
  onIncrease,
  onDecrease,
  onRefresh,
  onCheckout,
}: Props) {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="h-full flex flex-col gap-6 p-6 md:p-8 border rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Active Cart</h2>
        <p className="text-muted-foreground">Review items before checkout</p>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Refresh
          </Button>
        )}
      </div>

      {/* Cart Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Subtotal</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.cartItemId} className="border-b">
                <td className="p-3">{item.productName}</td>
                <td className="p-3 text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(item.price)}
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onDecrease?.(
                          item.cartItemId,
                          item.productId,
                          "decrease"
                        )
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onIncrease?.(
                          item.cartItemId,
                          item.productId,
                          "increase"
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="p-3 text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(item.price * item.quantity)}
                </td>
                <td className="p-3 text-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onRemove?.(item.cartItemId)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Total */}
      <div className="flex justify-end items-center border-t pt-4">
        <h3 className="text-xl font-bold">
          Total:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(total)}
        </h3>
        <Button
          size="lg"
          className="ml-auto text-xl"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

// // features/cashier/cart/CashierCartTable.tsx
// "use client";

// import { cashierCartColumns } from "./components/cashier-cart-columns";
// import { ICartItem } from "@/types/cart.type";
// import { ProductDataTable } from "@/app/admin/products/components/product-data-table";

// interface Props {
//   // items: ICartItem[];
//   // onRemove?: (productName: string) => void;
//   // onIncrease?: (productName: string) => void;
//   // onDecrease?: (productName: string) => void;
//   // onRefresh?: () => void;
//   items: ICartItem[];
//   onRemove?: (cartItemId: string) => void;
//   onIncrease?: (
//     cartItemId: string,
//     productId: string,
//     action: "increase"
//   ) => void;
//   onDecrease?: (
//     cartItemId: string,
//     productId: string,
//     action: "decrease"
//   ) => void;
//   onRefresh?: () => void;
// }

// export default function CashierCartTable({
//   items,
//   onRemove,
//   onIncrease,
//   onDecrease,
//   onRefresh,
// }: Props) {
//   return (
//     <div className="h-full flex-1 flex-col gap-8 p-6 md:p-8 md:flex md:border md:rounded-md">
//       <div className="flex items-center justify-between gap-2">
//         <div className="flex flex-col gap-1">
//           <h2 className="text-2xl font-semibold tracking-tight">Cart</h2>
//           <p className="text-muted-foreground">
//             Manage items in the active cart
//           </p>
//         </div>
//       </div>

//       <ProductDataTable
//         columns={cashierCartColumns(onRemove, onIncrease, onDecrease)}
//         data={items}
//         onRefresh={onRefresh}
//       />
//     </div>
//   );
// }
