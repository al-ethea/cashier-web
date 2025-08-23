'use client'
import apiInstance from '@/utils/api/apiInstance';
import { axiosErrorResponse } from '@/utils/axios-error/axiosErrorResponse';
import * as React from 'react';

export default function useAllCashiers(searchParams?: URLSearchParams) {
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [allCashiers, setAllCashiers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const queryString = React.useMemo(() => 
    searchParams ? searchParams.toString() : '', 
    [searchParams?.toString()]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = `/cashier/all${queryString ? '?' + queryString : ''}`;
        const response = await apiInstance.get(url);
        setAllCashiers(response.data.cashiers);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.log(axiosErrorResponse(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [queryString]);

  const fetchAllCashiers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const currentQuery = searchParams ? searchParams.toString() : '';
      const url = `/cashier/all${currentQuery ? '?' + currentQuery : ''}`;
      const response = await apiInstance.get(url);
      setAllCashiers(response.data.cashiers);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log(axiosErrorResponse(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    allCashiers,
    totalItems,
    fetchAllCashiers,
    isLoading
  };
}