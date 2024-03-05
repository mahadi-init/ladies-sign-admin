import { OrderStatusType } from "./order-status";

export interface OrderSummaryType {
  _id: string;
  invoice: string;
  name: string;
  address: string;
  city: string;
  totalAmount: number;
  shippingCost: number;
  subTotal: string;
  status: OrderStatusType;
  trackingCode?: string;
  trackingLink?: string;
  contact: string;
  note: string;
  createdAt: Date;
}

export interface OrderType extends Partial<OrderSummaryType> {
  email: string;
  country: string;
  zipCode: number;
  discount: number;
  paymentMethod: string;
  cart: {
    brand: {
      name: string;
    };
    category: {
      name: string;
    };
    _id: string;
    sku: string;
    img: string;
    title: string;
    slug: string;
    unit: string;
    imageUrls: {
      color: {
        name: string;
        clrCode: string;
      };
      img: string;
    }[];
    parent: string;
    children: string;
    price: number;
    discount: number;
    quantity: number;
    status: string;
    productType: string;
    orderQuantity: number;
  }[];
}
