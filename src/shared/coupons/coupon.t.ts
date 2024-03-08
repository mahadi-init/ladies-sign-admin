export interface CouponType {
  _id: string;
  title: string;
  logo: string;
  couponCode: string;
  startTime: Date;
  endTime: Date;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
  status: string;
  createdAt: Date;
}
