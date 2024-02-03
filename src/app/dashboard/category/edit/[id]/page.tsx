import { BACKEND_URL } from "@/consts/site-info";
import SharedCategoryUI from "../../ui";
import { getProductTypes } from "@/utils/get-product-types";
import { CategoryType } from "@/types/category";
import { patchData } from "@/actions/patch";
import getData from "@/actions/get";

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const productTypes = await getProductTypes();
  const data = await getData<CategoryType>(
    `${BACKEND_URL}/api/category/get/${params.id}`,
    10,
  );

  return (
    <SharedCategoryUI
      {...data}
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/category/edit/${params.id}`}
      validationTag="category"
      successMessage="Category edited successfully"
      serverAction={patchData}
    />
  );
}
