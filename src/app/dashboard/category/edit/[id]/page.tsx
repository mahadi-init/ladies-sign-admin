import { BACKEND_URL } from "@/consts/site-info";
import { getProductTypes } from "@/utils/get-product-types";
import { CategoryType } from "@/types/category";
import { patchData } from "@/actions/patch";
import getData from "@/actions/get";
import SharedCategoryUI from "@/ui/SharedCategoryUI";

const getCategoryData = async (id: string) => {
  const data = await getData<CategoryType>(
    `${BACKEND_URL}/api/category/get/${id}`,
    10,
  );

  return data;
};

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const data = await Promise.all([
    await getProductTypes(),
    await getCategoryData(params.id),
  ]);

  return (
    <SharedCategoryUI
      {...data[1]}
      productTypes={data[0]}
      queryUrl={`${BACKEND_URL}/api/category/edit/${params.id}`}
      validationTag="category"
      successMessage="Category edited successfully"
      serverAction={patchData}
    />
  );
}
