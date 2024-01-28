import { BACKEND_URL } from "@/consts/site-info";
import SharedCategoryUI from "../../_shared/ui";
import { editCategory } from "./_action";
import { CategoryType } from "../../type";

const getProductTypes = async (): Promise<string[]> => {
  const res = await fetch(`${BACKEND_URL}/api/product/all/product-types`);
  const types = await res.json();

  return types.data;
};

const getCategoryData = async (id: string): Promise<CategoryType> => {
  const res = await fetch(`${BACKEND_URL}/api/category/get/${id}`);
  const data = await res.json();

  return data;
};

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const productTypes = await getProductTypes();
  const data = await getCategoryData(params.id);
  console.log(data);

  return (
    <SharedCategoryUI
      {...data}
      productTypes={productTypes}
      serverAction={editCategory}
    />
  );
}
