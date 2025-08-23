import { useState, useEffect } from "react";
import apiInstance from "@/utils/api/apiInstance";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import authStore from "@/zustand/authStore";
import { ICart } from "@/types/cart.type";

export default function useCashierCart() {
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(false);
  const token = authStore((state) => state.token);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get("/cart/display", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data.cart);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const response = await apiInstance.put(
        `/cart/${cartItemId}/delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      fetchCart();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to remove item");
    }
  };

  const updateQuantity = async (
    cartItemId: string,
    productId: string,
    // productName: string,
    action: "increase" | "decrease"
  ) => {
    try {
      const response = await apiInstance.put(
        `/cart/item/${cartItemId}/product/${productId}/update-qty`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // toast.success(response.data.message);
      fetchCart();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to update quantity");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  return {
    cart,
    loading,
    fetchCart,
    removeFromCart,
    updateQuantity,
  };
}
