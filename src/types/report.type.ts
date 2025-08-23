import { ICashier } from "./cashier.type"

export interface ITransactionReport {
  id: string
  cashier: ICashier
  cashierBalanceHistory: {
    id: string
    startingCash: number
    endingCash: number
  }
  transactionItems: {
    id: string
    product: {
      id: string
      name: string
      price: number
      productCategory: {
        id: number
        name: string
      }
    }
  }
  paymentType: string | EPaymentType
  debitCardNumber?: string
  totalAmount: number
  changeAmount?: number
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
}

enum EPaymentType {
  CASH,
  DEBIT
}

export interface ITransactionReportMonthly {
  date: Date
  totalAmount: number
  transactionCount: number
}

export interface ITransactionReportItemsDaily {
  productId: string
  product: {
    name: string
    price: number
    productImgUrl: string
    productCategory: {
      id: number
      name: string
    }
  }
  totalQuantitySold: number
  totalRevenue: number
  transactionCount: number
}

export interface ITransactionReportCashier {
  shift: string
  totalRevenue: number
  totalCash: number
  totalDebit: number
  transactionCount: number
  cashierCount: number
  cashierNames: string[]
  startingCash: number
  endingCash: number
}