import { SellerType } from "@/types/seller";
import { Model, model, models, Schema } from "mongoose";

const sellerSchema = new Schema<SellerType>(
  {
    name: String,
    password: String,
    email: String,
    phone: String,
    img: String,
    address: String,
    whatsapp: String,
    nid: String,
    license: String,
    balance: Number,
    facebookProfile: String,
    facebookPage: String,
    approved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const SellerModel: Model<SellerType> =
  models?.Seller || model("Seller", sellerSchema);
