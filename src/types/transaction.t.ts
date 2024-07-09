export interface TransactionType {
  _id : string;
  amount: number;
  isSeller: boolean;
  merchantInvoiceNumber: string;
  paymentID: string;
  person: string;
  transactionStatus: string;
  createdAt: Date;
  updatedAt: Date;
}