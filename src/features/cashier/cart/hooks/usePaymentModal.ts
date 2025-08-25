import { useState, useEffect } from "react";
import apiInstance from "@/utils/api/apiInstance";
import { toast } from "react-toastify";
import authStore from "@/zustand/authStore";
import { UsePaymentModalProps } from "@/types/payment.type";
import { AxiosError } from "axios";

export default function usePaymentModal({
  cartId,
  totalAmount,
  onSuccess,
  onClose,
}: UsePaymentModalProps) {
  const [paymentType, setPaymentType] = useState<"CASH" | "DEBIT">("CASH");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [changeAmount, setChangeAmount] = useState<number>(0);
  const [debitCardNumber, setDebitCardNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const token = authStore((state) => state.token);

  // auto-calc change when cash received changes
  useEffect(() => {
    if (paymentType === "CASH") {
      setChangeAmount(Math.max(cashReceived - totalAmount, 0));
    }
  }, [cashReceived, paymentType, totalAmount]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const body: any = { paymentType };

      if (paymentType === "CASH") {
        body.changeAmount = changeAmount;
      } else if (paymentType === "DEBIT") {
        body.debitCardNumber = debitCardNumber;
      }

      const response = await apiInstance.post(
        `/transactions/${cartId}/create`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transaction success:", response.data);
      toast.success(response.data.message || "Transaction completed!");
      onSuccess?.(); // refresh cart or navigate
      onClose?.();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      toast.error(err?.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };
  return {
    paymentType,
    setPaymentType,
    cashReceived,
    setCashReceived,
    changeAmount,
    debitCardNumber,
    setDebitCardNumber,
    loading,
    handleConfirm,
  };
}
