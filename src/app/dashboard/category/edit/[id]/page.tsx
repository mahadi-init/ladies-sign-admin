import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import CategoryUI from "@/shared/categories/CategoryUI";
import { CategoryType } from "@/shared/categories/category.t";
import { getProductTypes } from "@/shared/products/get-product-types";
import { BACKEND_URL } from "../../../../../../site-info";

const getCategoryData = async (id: string) => {
  const data = await getData<CategoryType>(
    `${BACKEND_URL}/api/category/get/${id}`,
    true
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
      <CategoryUI
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
