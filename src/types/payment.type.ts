export interface IPaymentModal {
  isOpen: boolean;
  onClose: () => void;
  cartId: string;
  totalAmount: number;
  onSuccess?: () => void; // callback after successful transaction
}

export interface UsePaymentModalProps {
  cartId: string;
  totalAmount: number;
  onSuccess?: () => void;
  onClose?: () => void;
}
