import { ReviewType } from "@/types/review";
import mongoose, { Model, models } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema<ReviewType>(
  {
    by: {
      type: String,
      reuired: true,
      default: "anonymous",
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ReviewModel: Model<ReviewType> =
  models?.Review || mongoose.model("Review", reviewSchema);