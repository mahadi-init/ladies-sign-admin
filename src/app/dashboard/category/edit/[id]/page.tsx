import { BACKEND_URL } from "@/consts/site-info";
import SharedCategoryUI from "../../_shared/ui";
import { editCategory } from "./_action";
import { CategoryType } from "../../type";
import { getProductTypes } from "@/utils/get-product-types";

const getCategoryData = async (id: string): Promise<CategoryType> => {
  const res = await fetch(`${BACKEND_URL}/api/category/get/${id}`, {
    next: {
      revalidate: 10,
    },
  });
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

  return (
    <SharedCategoryUI
      {...data}
      productTypes={productTypes}
      serverAction={editCategory}
    />
  );
}
