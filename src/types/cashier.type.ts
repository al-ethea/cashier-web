import { ICartItem } from "./cart.type";

export interface ICashier {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: EGender;
  shift: EShiftSession | string;
  avatarImgUrl: string;
  cldPublicId: string;
}

export enum EShiftSession {
  SHIFT1,
  SHIFT2,
}

export enum EGender {
  Male,
  Female,
}

export interface ICashierModalProps {
  id: string;
  title: string;
  description: string;
  value: string | number;
  placeholder: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  confirmText?: string;
  confirmColor?: "green" | "red";
}

export interface IRevenueCardProps {
  totalRevenue: number;
}

export interface IShiftCardProps {
  shift: string;
  startTime: string;
  endTime: string;
  openClockInModal: () => void;
  openClockOutModal: () => void;
}

export interface ICashierCartTable {
  items: ICartItem[];
  onRemove?: (cartItemId: string) => void;
  onIncrease?: (
    cartItemId: string,
    productId: string,
    action: "increase"
  ) => void;
  onDecrease?: (
    cartItemId: string,
    productId: string,
    action: "decrease"
  ) => void;
  onRefresh?: () => void;
  onCheckout?: () => void;
}
