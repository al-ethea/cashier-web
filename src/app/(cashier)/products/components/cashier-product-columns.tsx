import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types/product.type";
import { Button } from "@/components/ui/button";

export const cashierProductColumns = (
  onAddToCart: (id: string) => void
): ColumnDef<IProduct>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
    size: 200,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 100,
    cell: ({ row }) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0, // no decimals for Rupiah
      }).format(row.original.price),
  },
  {
    id: "action",
    header: "Action",
    size: 150,
    cell: ({ row }) => (
      <Button onClick={() => onAddToCart(row.original.id)}>Add to Cart</Button>
    ),
  },
];
