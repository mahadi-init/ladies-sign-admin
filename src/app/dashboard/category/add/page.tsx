import { addData } from "@/actions/post";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import CategoryUI from "@/shared/categories/CategoryUI";
import { getProductTypes } from "@/shared/products/get-product-types";
import { BACKEND_URL } from "../../../../../site-info";

export default async function AddCategory() {
  const productTypes = await getProductTypes();

  return (
    <>
      <PageTop title="Add Category" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Category", link: "/dashboard/category" },
        ]}
      />
      <CategoryUI
        productTypes={productTypes}
        queryUrl={`${BACKEND_URL}/api/category/add`}
        validationTag="category"
        successMessage="Category added successfully"
        serverAction={addData}
      />
    </>
  );
}
