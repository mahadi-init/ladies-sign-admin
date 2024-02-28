import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { CategoryType } from "@/types/category";
import SharedCategoryUI from "@/ui/SharedCategoryUI";
import { getProductTypes } from "@/utils/get-product-types";

const getCategoryData = async (id: string) => {
  const data = await getData<CategoryType>(
    `${BACKEND_URL}/api/category/get/${id}`,
    0
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
    <>
      <PageTop title="Edit Category" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Category", link: "/dashboard/category" },
        ]}
      />
      <SharedCategoryUI
        {...data[1]}
        productTypes={data[0]}
        queryUrl={`${BACKEND_URL}/api/category/edit/${params.id}`}
        validationTag="category"
        successMessage="Category edited successfully"
        serverAction={patchData}
      />
    </>
  );
}
