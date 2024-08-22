import { site } from "@/site-config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const status = mongoose.connection.readyState;

    if (status === 0) {
      await mongoose.connect(site.MONGO_URI as string);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
