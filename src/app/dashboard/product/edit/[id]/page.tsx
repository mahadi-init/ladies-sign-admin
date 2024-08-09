import ProductForm from "./form"
import { ProductType } from "@/types/product"
import PageTop from "@/components/native/PageTop"
import { getProductData } from "./data"

//FIXME: EDITING ALMOST WORKS FINE BUT WHEN I UPLOAD NEW IMAGE FROM VARIANTS IT CRASHES
export default async function EditProduct({ params }: { params: { id: string } }) {
  const data: ProductType = JSON.parse(await getProductData(params.id))

  return (
    <>
      <PageTop title="Edit Product" />
      <ProductForm data={data} />
    </>
  )
}