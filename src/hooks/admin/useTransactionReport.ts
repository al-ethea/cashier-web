'use client';
import * as React from 'react';
import {
  ITransactionReport,
  ITransactionReportCashier,
  ITransactionReportItemsDaily,
  ITransactionReportMonthly,
} from '@/types/report.type';
import apiInstance from '@/utils/api/apiInstance';
import { axiosErrorResponse } from '@/utils/axios-error/axiosErrorResponse';

type TTransactionReport =
  | ITransactionReport[]
  | ITransactionReportMonthly[]
  | ITransactionReportItemsDaily[]
  | ITransactionReportCashier[];

export default function useTransactionReport(searchParams?: URLSearchParams) {
  const [transactionReports, setTransactionReports] = React.useState<TTransactionReport>([]);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const queryString = React.useMemo(() => (searchParams ? searchParams.toString() : ''), [searchParams?.toString()]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
    try {
      const response = await apiInstance.get(`/reports/transactions/all${queryString ? '?' + queryString : ''}`);
      setTransactionReports(response.data.transactions);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log(axiosErrorResponse(error));
      } finally {
        setIsLoading(false);
    }
    };
    fetchData();
  }, [queryString]);

  const fetchTransactionReports = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiInstance.get(`/reports/transactions/all${queryString ? '?' + queryString : ''}`);
      setTransactionReports(response.data.transactions);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log(axiosErrorResponse(error));
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);
  return { transactionReports, totalItems, refreshFetch: fetchTransactionReports, isLoading };
}
