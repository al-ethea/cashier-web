"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { IPaymentModal } from "@/types/payment.type";
import usePaymentModal from "./hooks/usePaymentModal";

export default function PaymentModal({
  isOpen,
  onClose,
  cartId,
  totalAmount,
  onSuccess,
}: IPaymentModal) {
  const {
    paymentType,
    setPaymentType,
    cashReceived,
    setCashReceived,
    changeAmount,
    debitCardNumber,
    setDebitCardNumber,
    loading,
    handleConfirm,
  } = usePaymentModal({ cartId, totalAmount, onSuccess, onClose });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div>
            <label className="font-semibold">Payment Type</label>
            <select
              className="w-full border rounded-md p-2 mt-1"
              value={paymentType}
              onChange={(e) =>
                setPaymentType(e.target.value as "CASH" | "DEBIT")
              }
            >
              <option value="CASH">Cash</option>
              <option value="DEBIT">Debit Card</option>
            </select>
          </div>

          {paymentType === "CASH" && (
            <div>
              <label className="font-semibold">Cash Received</label>
              <input
                type="number"
                className="w-full border rounded-md p-2 mt-1"
                value={cashReceived}
                onChange={(e) => setCashReceived(Number(e.target.value))}
              />
              <p className="mt-1">Change: Rp {changeAmount.toLocaleString()}</p>
            </div>
          )}

          {paymentType === "DEBIT" && (
            <div>
              <label className="font-semibold">Debit Card Number</label>
              <input
                type="text"
                className="w-full border rounded-md p-2 mt-1"
                value={debitCardNumber}
                onChange={(e) => setDebitCardNumber(e.target.value)}
              />
            </div>
          )}

          <div className="mt-2 font-bold text-lg">
            Total: Rp {totalAmount.toLocaleString()}
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              loading ||
              (paymentType === "DEBIT" && debitCardNumber === "") ||
              (paymentType === "CASH" && cashReceived < totalAmount)
            }
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
