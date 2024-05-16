export interface TransactionType {
  amount: number;
  createdAt: Date;
  isSeller: boolean;
  merchantInvoiceNumber: string;
  paymentID: string;
  person: string;
  transactionStatus: string;
  updatedAt: Date;
}

export interface WithdrawType {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
