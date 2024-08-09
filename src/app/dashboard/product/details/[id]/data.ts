import { ProductModel } from "@/models/product.model"

export const getProductData = async (id?: string) => {
  const res = await ProductModel.findById(id)

  return JSON.stringify(res)
}
