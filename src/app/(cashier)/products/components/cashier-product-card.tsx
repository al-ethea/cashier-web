"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/types/product.type";
import Image from "next/image";

interface CashierProductCardProps {
  product: IProduct;
  onAddToCart: (productId: string) => void;
}

export default function CashierProductCard({
  product,
  onAddToCart,
}: CashierProductCardProps) {
  return (
    <Card key={product.id} className="shadow-md rounded-2xl overflow-hidden">
      {/* Product image */}
      <div className="relative w-full h-40 bg-gray-100">
        <Image
          src={product.productImgUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base truncate">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          {product.productCategory?.name || "Uncategorized"}
        </p>
        <p className="font-semibold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(product.price)}
        </p>
        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
