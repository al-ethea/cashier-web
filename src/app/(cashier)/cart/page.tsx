"use client";

import CashierCartTable from "@/features/cashier/cart/CashierCartTable";
import useCashierCart from "@/features/cashier/cart/hooks/useCashierCart";
import PaymentModal from "@/features/cashier/cart/PaymentModal";
import { useState } from "react";

export default function CashierCartPage() {
  const { cart, loading, removeFromCart, updateQuantity, fetchCart } =
    useCashierCart();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!cart) return <p className="p-6 text-muted-foreground">No active cart</p>;

  return (
    <>
      <CashierCartTable
        items={cart.items}
        onRemove={removeFromCart}
        onIncrease={(cartItemId, productId) =>
          updateQuantity(cartItemId, productId, "increase")
        }
        onDecrease={(cartItemId, productId) =>
          updateQuantity(cartItemId, productId, "decrease")
        }
        onCheckout={() => setModalOpen(true)}
      />

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cartId={cart.cartId}
        totalAmount={cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )}
        onSuccess={fetchCart} // refresh cart after transaction
      />
    </>
  );
}
