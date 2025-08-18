export interface IProduct {
  id: string;
  productCategoryId: string;
  productCategory: {
    id: number;
    name: string;
  };
  name: string;
  description?: string;
  price: number;
  productImgUrl: string;
  cldPublicId: string;
}
