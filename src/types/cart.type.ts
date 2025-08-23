export interface ICartItem {
  cartItemId: string; // cartItemId
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ICart {
  cartId: string;
  customerName?: string;
  items: ICartItem[];
}
