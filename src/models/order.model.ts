import { OrderType } from "@/types/order";
import mongoose, { Model, model, models, Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new Schema<OrderType>(
  {
    name: {
      type: String,
      required: true,
    },
    cart: [
      {
        id: ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        img: String,
        sku: String,
        color: String,
        size: String,
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    sku: String,
    total: {
      type: Number,
      required: true,
    },
    note: String,
    trackingLink: String,
    consignmentId: String,
    sellerName: String,
    sellerId: String,
    confirm: {
      type: String,
      default: "NO",
    },
    invoice: {
      type: String,
      unique: true,
    },
    lastChecked: Date,
    status: {
      type: String,
      default: "WAITING",
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre("save", async function (next) {
  this.invoice = this._id.toString().slice(-6);
  next();
});

export const OrderModel: Model<OrderType> =
  models?.Order || model("Order", orderSchema);
