export interface ReviewType {
  _id?: string;
  userId?: string;
  productId?: string;
  product?: string;
  productImage?: string;
  rating?: number;
  comment?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
