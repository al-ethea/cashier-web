"use client";

import CashierCartTable from "@/features/cashier/cart/CashierCartTable";
import useCashierCart from "@/features/cashier/cart/useCashierCart";

export default function CashierCartPage() {
  const { cart, loading, removeFromCart, updateQuantity } = useCashierCart();

  if (loading) return <p className="p-6">Loading...</p>;
  if (!cart) return <p className="p-6 text-muted-foreground">No active cart</p>;

  return (
    <CashierCartTable
      items={cart.items}
      onRemove={removeFromCart}
      onIncrease={(cartItemId, productId) =>
        updateQuantity(cartItemId, productId, "increase")
      }
      onDecrease={(cartItemId, productId) =>
        updateQuantity(cartItemId, productId, "decrease")
      }
      // onCheckout={handleCheckout} // ✅ pass handler
    />
  );
}
