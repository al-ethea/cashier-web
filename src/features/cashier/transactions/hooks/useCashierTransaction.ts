import { useState, useEffect } from "react";
import apiInstance from "@/utils/api/apiInstance";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import authStore from "@/zustand/authStore";
import * as React from "react";
import { ITransactionHistory } from "../TransactionHistoryTable";

interface ITransactionItem {
  productName: string;
  unitPrice: number;
  quantity: number;
  subTotal: number;
}
export interface ITransactionDetails {
  transactionId: string;
  cartId: string;
  paymentType: string;
  debitCardNumber?: string;
  totalAmount: number;
  changeAmount?: number;
  paymentDate: string;
  items: ITransactionItem[];
}
export default function useCashierTransaction() {
  const [transactions, setTransactions] = React.useState<ITransactionHistory[]>(
    []
  );
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    string | null
  >(null);
  const [transactionDetails, setTransactionDetails] =
    React.useState<ITransactionDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const token = authStore((state) => state.token);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await apiInstance.get("/transactions/get-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(
        res.data.history.map((tx: any) => ({
          transactionId: tx.transactionId,
          paymentDate: tx.paymentDate,
          paymentType: tx.paymentType,
          totalAmount: tx.totalAmount,
          cartId: tx.cartId,
        }))
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      toast.error("Failed to fetch transaction history");
    } finally {
      setLoading(false);
    }
  };

  // Fetch details for a selected transaction
  const fetchTransactionDetails = async (transactionId: string) => {
    try {
      setDetailsLoading(true);
      const res = await apiInstance.get(
        `/transactions/${transactionId}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactionDetails(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to fetch transaction details"
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleDetails = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    fetchTransactionDetails(transactionId);
  };

  React.useEffect(() => {
    if (token) {
      fetchTransactions();
    }
  }, [token]);
  return {
    selectedTransaction,
    setSelectedTransaction,
    transactionDetails,
    transactions,
    loading,
    detailsLoading,
    fetchTransactions,
    handleDetails,
  };
}
