'use client'
import apiInstance from '@/utils/api/apiInstance';
import { axiosErrorResponse } from '@/utils/axios-error/axiosErrorResponse';
import * as React from 'react';

export default function useAllProducts(searchParams?: URLSearchParams) {
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [allProducts, setAllProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const queryString = React.useMemo(() => 
    searchParams ? searchParams.toString() : '', 
    [searchParams?.toString()]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = `/products/all${queryString ? '?' + queryString : ''}`;
        const response = await apiInstance.get(url);
        setAllProducts(response.data.products);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.log(axiosErrorResponse(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [queryString]);

  const fetchAllProducts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const currentQuery = searchParams ? searchParams.toString() : '';
      const url = `/products/all${currentQuery ? '?' + currentQuery : ''}`;
      const response = await apiInstance.get(url);
      setAllProducts(response.data.products);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log(axiosErrorResponse(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    allProducts,
    totalItems,
    fetchAllProducts,
    isLoading
  };
}