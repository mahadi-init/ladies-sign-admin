// const withdrawSchema = new mongoose.Schema(
//   {
//     seller: {
//       type: ObjectId,
//       ref: "Seller",
//       required: true,
//     },
//     status: {
//       type: String,
//       default: "PENDING",
//     },
//     amount: {
//       type: Number,
//       requried: true,
//     },
//     message: String,
//     bkash: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

export interface WithdrawType {
  _id: string;
  seller: string;
  status: string;
  amount: number;
  message: string;
  bkash: string;
  createdAt: Date;
  updatedAt: Date;
}