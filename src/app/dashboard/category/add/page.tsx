import { addData } from "@/actions/post";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import SharedCategoryUI from "@/ui/SharedCategoryUI";
import { getProductTypes } from "@/utils/get-product-types";

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
      <SharedCategoryUI
        productTypes={productTypes}
        queryUrl={`${BACKEND_URL}/api/category/add`}
        validationTag="category"
        successMessage="Category added successfully"
        serverAction={addData}
      />
    </>
  );
}
