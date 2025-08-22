import { IProduct } from "@/types/product.type";
import apiInstance from "@/utils/api/apiInstance";
import { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";
import authStore from "@/zustand/authStore";

export default function useCashierProducts() {
  const [allProducts, setAllProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const token = authStore((state) => state.token);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get("/products/all");
      setAllProducts(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/products/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (
    productId: string,
    quantity: number = 1,
    customerName?: string
  ) => {
    try {
      const response = await apiInstance.post(
        "/cart/add",
        {
          productId,
          quantity,
          customerName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Failed to add product to cart"
      );
    }
  };

  React.useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  return {
    allProducts,
    setAllProducts,
    fetchAllProducts,
    categories,
    addToCart,
    loading,
  };
}
