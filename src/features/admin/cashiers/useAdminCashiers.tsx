import useAllCashiers from '@/hooks/admin/useAllCashiers';
import usePagination from '@/hooks/filter-tools/usePagination';
import useSearchFilter from '@/hooks/filter-tools/useSearchFilter';
import { ICashier } from "@/types/cashier.type";
import apiInstance from "@/utils/api/apiInstance";
import { axiosErrorResponse } from '@/utils/axios-error/axiosErrorResponse';
import urlParamsSanitization from '@/utils/urlParamsSanitization';
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from "react";
import { toast } from "react-toastify";

export default function useAdminCashiers({id}:{id?:string} = {}) {
  const searchRouter = useRouter();
  const searchParams = useSearchParams();

  const sanitizedParams = React.useMemo(() => 
    urlParamsSanitization(searchParams, ['page', 'limit', 'search_firstName_lastName', 'shift']),
    [searchParams.toString()]
  );

  const { allCashiers, totalItems, fetchAllCashiers, isLoading } = useAllCashiers(sanitizedParams);

  const { columnsSearchKey, columnsToSearch, searchFilterValue, setSearchFilterValue, handleSearchFilterChange } =
    useSearchFilter({
      searchRouter,
      searchParams,
      columnsToSearch: ['firstName', 'lastName'],
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
    defaultPageKey: 'page',
    defaultPageSizeKey: 'limit',
    pageSizeVariants: [10, 20, 30, 40, 50],
  });

  const [addCashierDialogOpen, setAddCashierDialogOpen] = React.useState(false);

  const [editCashierDialogOpen, setEditCashierDialogOpen] = React.useState(false);

  const [currentCashier, setCurrentCashier] = React.useState<ICashier | null>(null);
  const fetchCashierById = async () => {
    try {
      const response = await apiInstance.get(`/cashier/id/${id}`);
      console.log(response.data.cashier); 
      setCurrentCashier(response.data.cashier);
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      console.error(errResponse.response?.data.message);
    }
  };

  const handleDeleteCashier = async (id: string, password?: string) => {
    try {
      const response = await apiInstance.delete(`/cashier/delete/${id}`);
      toast.warning(response.data.message);
      fetchAllCashiers();
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      console.error(errResponse.response?.data.message);
    }
  }

  return {
    allCashiers,
    totalItems,
    fetchAllCashiers,
    isLoading,
    addCashierDialogOpen,
    setAddCashierDialogOpen,
    editCashierDialogOpen,
    setEditCashierDialogOpen,
    currentCashier,
    setCurrentCashier,
    fetchCashierById,
    handleDeleteCashier,
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
  }
}