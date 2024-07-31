import { site } from "@/site-config";
import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(site.MONGO_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
