// // features/cashier/cart/components/cashier-cart-columns.tsx
// import { ColumnDef } from "@tanstack/react-table";
// import { ICartItem } from "@/types/cart.type";
// import { Button } from "@/components/ui/button";

// export const cashierCartColumns = (
//   // onRemove?: (productName: string) => void,
//   // onIncrease?: (productName: string) => void,
//   // onDecrease?: (productName: string) => void
//   onRemove?: (cartItemId: string) => void,
//   onIncrease?: (
//     cartItemId: string,
//     productId: string,
//     action: "increase"
//   ) => void,
//   onDecrease?: (
//     cartItemId: string,
//     productId: string,
//     action: "decrease"
//   ) => void
// ): ColumnDef<ICartItem>[] => [
//   {
//     accessorKey: "productName",
//     header: "Product Name",
//     size: 200,
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//     size: 100,
//     cell: ({ row }) =>
//       new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//         maximumFractionDigits: 0,
//       }).format(row.original.price),
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//     size: 100,
//     cell: ({ row }) => (
//       <div className="flex items-center gap-2">
//         {onDecrease && (
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() =>
//               onDecrease?.(
//                 row.original.cartItemId,
//                 row.original.productId,
//                 "decrease"
//               )
//             }
//           >
//             -
//           </Button>
//         )}
//         <span>{row.original.quantity}</span>
//         {onIncrease && (
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() =>
//               onIncrease?.(
//                 row.original.cartItemId,
//                 row.original.productId,
//                 "increase"
//               )
//             }
//           >
//             +
//           </Button>
//         )}
//       </div>
//     ),
//   },
//   {
//     id: "subtotal",
//     header: "Subtotal",
//     size: 120,
//     cell: ({ row }) =>
//       new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//         maximumFractionDigits: 0,
//       }).format(row.original.price * row.original.quantity),
//   },
//   {
//     id: "action",
//     header: "Action",
//     size: 100,
//     cell: ({ row }) =>
//       onRemove && (
//         <Button
//           size="sm"
//           variant="destructive"
//           onClick={() => onRemove(row.original.cartItemId)}
//         >
//           Remove
//         </Button>
//       ),
//   },
// ];
