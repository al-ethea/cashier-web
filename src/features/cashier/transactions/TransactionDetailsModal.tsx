"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ITransactionDetails } from "./hooks/useCashierTransaction";

interface ITransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: ITransactionDetails | null;
  loading: boolean;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionDetails,
  loading,
}: ITransactionDetailsModalProps) {
  const totalAmount = transactionDetails?.items.reduce(
    (acc, item) => acc + item.subTotal,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        {loading && <p>Loading...</p>}
        {!loading && !transactionDetails && <p>No details found.</p>}

        {!loading && transactionDetails && (
          <div className="mt-4 flex flex-col gap-4">
            <p>
              <strong>Payment Type:</strong> {transactionDetails.paymentType}
            </p>
            {transactionDetails.paymentType === "DEBIT" && (
              <p>
                <strong>Debit Card Number:</strong>{" "}
                {transactionDetails.debitCardNumber}
              </p>
            )}
            {transactionDetails.paymentType === "CASH" && (
              <p>
                <strong>Change:</strong> Rp{" "}
                {transactionDetails.changeAmount?.toLocaleString()}
              </p>
            )}
            <p>
              <strong>Payment Date:</strong>{" "}
              {new Date(transactionDetails.paymentDate).toLocaleString()}
            </p>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-right">Qty</th>
                  <th className="p-2 text-right">Unit Price</th>
                  <th className="p-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transactionDetails.items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">
                      Rp {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      Rp {item.subTotal.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="p-2 text-right font-bold">
                    Total
                  </td>
                  <td className="p-2 text-right font-bold">
                    Rp {totalAmount?.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
