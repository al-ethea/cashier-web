// import { IProduct } from "@/types/product.type";
// import apiInstance from "@/utils/api/apiInstance";
// import { AxiosError } from "axios";
// import * as React from "react";
// import { toast } from "react-toastify";
// import authStore from "@/zustand/authStore";

// export default function useCashierProducts(searchParams?: URLSearchParams) {
//   const [allProducts, setAllProducts] = React.useState<IProduct[]>([]);
//   const [categories, setCategories] = React.useState<string[]>([]);
//   const [loading, setLoading] = React.useState(false);
//   const token = authStore((state) => state.token);

//   const [page, setPage] = React.useState(1);
//   const [limit] = React.useState(8); // products per page

//   // fetch products with pagination
//   const fetchAllProducts = async (page: number = 1, limit: number = 10) => {
//     try {
//       setLoading(true);
//       const response = await apiInstance.get("/products/all", {
//         params: {
//           page,
//           limit,
//           search: searchParams?.get("search_name") || "",
//           category: searchParams?.get("category") || "",
//         },
//       });
//       setAllProducts(response.data.products);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await apiInstance.get("/products/categories");
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addToCart = async (
//     productId: string,
//     quantity: number = 1,
//     customerName?: string
//   ) => {
//     try {
//       const response = await apiInstance.post(
//         "/cart/add",
//         { productId, quantity, customerName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(response.data.message);
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       toast.error(
//         err.response?.data.message || "Failed to add product to cart"
//       );
//     }
//   };

//   React.useEffect(() => {
//     fetchAllProducts(page, limit);
//     fetchCategories();
//   }, [page, limit, searchParams]);

//   return {
//     allProducts,
//     setAllProducts,
//     fetchAllProducts,
//     categories,
//     addToCart,
//     loading,
//     page,
//     setPage,
//   };
// }
"use client";

import { IProduct } from "@/types/product.type";
import apiInstance from "@/utils/api/apiInstance";
import { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";
import authStore from "@/zustand/authStore";
import urlParamsSanitization from "@/utils/urlParamsSanitization";

export default function useCashierProducts(searchParams?: URLSearchParams) {
  const [allProducts, setAllProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const token = authStore((state) => state.token);

  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(8); // products per page

  // sanitize query params like admin does
  const sanitizedParams = React.useMemo(
    () =>
      searchParams
        ? urlParamsSanitization(searchParams, [
            "page",
            "limit",
            "search_name",
            "category",
          ])
        : {},
    [searchParams?.toString()]
  );

  // fetch products with pagination + filters
  const fetchAllProducts = async (
    pageNumber: number = page,
    pageLimit: number = limit
  ) => {
    try {
      setLoading(true);

      const params: Record<string, any> = {
        page: pageNumber,
        limit: pageLimit,
      };

      // ✅ only include search_name if it's not empty
      const search = searchParams?.get("search_name");
      if (search && search.trim() !== "") {
        params.search_name = search;
      }

      // ✅ include category if present
      const category = searchParams?.get("category");
      if (category && category.trim() !== "") {
        params.category = category;
      }

      const response = await apiInstance.get("/products/all", { params });
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
        { productId, quantity, customerName },
        { headers: { Authorization: `Bearer ${token}` } }
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
    fetchAllProducts(page, limit);
    fetchCategories();
  }, [page, limit, searchParams]);

  return {
    allProducts,
    setAllProducts,
    fetchAllProducts,
    categories,
    addToCart,
    loading,
    page,
    setPage,
    limit,
  };
}
