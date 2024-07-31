import { ProductType } from "@/types/product";
import { model, Model, models, Schema } from "mongoose";

const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: String,
    variants: [
      {
        color: String,
        img: String,
        size: String,
        quantity: Number,
        price: Number,
        sellerPrice: Number,
      },
    ],
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    videoId: String,
    status: {
      type: String,
      default: "IN-STOCK",
      enum: ["IN-STOCK", "OUT-OF-STOCK", "DISCONTINUED"],
    },
    // reviews: [{ type: ObjectId, ref: "Review" }],
    additionalInformation: [
      {
        key: String,
        value: String,
      },
    ],
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel: Model<ProductType> =
  models?.Product || model("Product", productSchema);
