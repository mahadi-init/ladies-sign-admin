export interface OrderType {
  _id: string;
  name: string;
  address: string;
  totalAmount: number;
  shippingCost: number;
  subTotal: string;
  status: string;
  createdAt: Date;
}
