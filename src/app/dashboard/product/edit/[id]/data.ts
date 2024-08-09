import { connectDB } from "@/db/connect"
import { ProductModel } from "@/models/product.model"

export const getProductData = async (id?: string) => {
  connectDB()

  const res = await ProductModel.findById(id)
  return JSON.stringify(res)
}
