import { ICashier } from "./cashier.type";

export interface ITransactionReport {
  id: string;
  cashier: ICashier;
  cashierBalanceHistory: {
    id: string;
    startingCash: number;
    endingCash: number;
  };
  transactionItems: {
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      productCategory: {
        id: number;
        name: string;
      };
    };
  };
  paymentType: string | EPaymentType;
  debitCardNumber?: string;
  totalAmount: number;
  changeAmount?: number;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

enum EPaymentType {
  CASH,
  DEBIT,
}

export interface ITransactionReportMonthly {
  date: Date;
  totalAmount: number;
  transactionCount: number;
}

export interface ITransactionReportItemsDaily {
  productId: string;
  product: {
    name: string;
    price: number;
    productImgUrl: string;
    productCategory: {
      id: number;
      name: string;
    };
  };
  totalQuantitySold: number;
  totalRevenue: number;
  transactionCount: number;
}

// export interface ITransactionReportCashier {
//   shift: string
//   totalRevenue: number
//   totalCash: number
//   totalDebit: number
//   transactionCount: number
//   cashierCount: number
//   cashierNames: string[]
//   startingCash: number
//   endingCash: number
// }

export interface ITransactionReportCashier {
  id: string;
  cashierName: string;
  shift: string; // "SHIFT1" | "SHIFT2"
  startTime: string; // ISO string from backend
  endTime: string | null; // can be null if shift still ongoing
  startingCash: number;
  endingCash: number;
  totalTransactions: number;
  totalRevenue: number;
  totalDebit: number;
}
