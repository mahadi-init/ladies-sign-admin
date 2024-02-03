export interface CouponType {
  _id?: string;
  title?: string;
  logo?: string;
  couponCode?: string;
  startTime?: string;
  endTime?: string;
  discountPercentage?: number;
  minimumAmount?: number;
  productType?: string;
  status?: string;
  createdAt?: string;
}
