import useAllProductCategories from "@/hooks/admin/useAllProductCategories";
import useAllProducts from "@/hooks/admin/useAllProducts";
import usePagination from "@/hooks/filter-tools/usePagination";
import useSearchFilter from "@/hooks/filter-tools/useSearchFilter";

import { IProduct } from "@/types/product.type";
import apiInstance from "@/utils/api/apiInstance";
import { axiosErrorResponse } from "@/utils/axios-error/axiosErrorResponse";
import urlParamsSanitization from "@/utils/urlParamsSanitization";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";

export default function useAdminProducts() {
  const searchRouter = useRouter();
  const searchParams = useSearchParams();
  // Filter dropdown

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const sanitizedParams = React.useMemo(
    () =>
      urlParamsSanitization(searchParams, [
        "page",
        "limit",
        "search_name",
        "category",
      ]),
    [searchParams.toString()]
  );

  const { allProducts, totalItems, fetchAllProducts, isLoading } =
    useAllProducts(sanitizedParams);

  const { categories } = useAllProductCategories();

  const {
    columnsSearchKey,
    columnsToSearch,
    searchFilterValue,
    setSearchFilterValue,
    handleSearchFilterChange,
  } = useSearchFilter({
    searchRouter,
    searchParams,
    columnsToSearch: ["name"],
  });

  const {
    pageNumberKey,
    pageSizeKey,
    pageSizeVariants,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    handlePageChange,
    handleNewPageSizeChange,
  } = usePagination({
    searchRouter,
    searchParams,
    defaultPageKey: "page",
    defaultPageSizeKey: "limit",
    pageSizeVariants: [10, 20, 30, 40, 50],
  });

  const [editProductDialogOpen, setEditProductDialogOpen] =
    React.useState(false);

  const [currentProduct, setCurrentProduct] = React.useState<IProduct | null>(
    null
  );

  const fetchProductById = async (id: string) => {
    try {
      const response = await apiInstance.get(`/products/id/${id}`);
      console.log(response.data.product);
      setCurrentProduct(response.data.product);
    } catch (error) {
      console.error(axiosErrorResponse(error));
    }
  };

  const handleDeleteProduct = async (id: string, password?: string) => {
    try {
      const response = await apiInstance.delete(`/products/delete/${id}`);
      toast.warning(response.data.message);
      fetchAllProducts();
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      console.error(errResponse.response?.data.message);
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    allProducts,
    totalItems,
    fetchAllProducts,
    isLoading,
    categories,
    editProductDialogOpen,
    setEditProductDialogOpen,
    currentProduct,
    setCurrentProduct,
    fetchProductById,
    handleDeleteProduct,
    pageNumberKey,
    pageSizeKey,
    pageSizeVariants,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    handlePageChange,
    handleNewPageSizeChange,
    searchFilterValue,
    handleSearchFilterChange,
    columnsToSearch,
  };
}
