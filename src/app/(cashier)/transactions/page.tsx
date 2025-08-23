"use client";

import * as React from "react";
import { TransactionHistoryTable } from "@/features/cashier/transactions/TransactionHistoryTable";
import useCashierTransaction from "@/features/cashier/transactions/hooks/useCashierTransaction";
import TransactionDetailsModal from "@/features/cashier/transactions/TransactionDetailsModal";

export default function CashierTransactionHistoryPage() {
  const {
    transactions,
    handleDetails,
    selectedTransaction,
    setSelectedTransaction,
    transactionDetails,
    detailsLoading,
  } = useCashierTransaction();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <TransactionHistoryTable data={transactions} onDetails={handleDetails} />
      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transactionDetails={transactionDetails}
          loading={detailsLoading}
        />
      )}
    </div>
  );
}
