import { addData } from "@/actions/post";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import BrandUI from "@/shared/brands/BrandUI";
import { BACKEND_URL } from "../../../../../site-info";

export default async function AddBrand() {
  return (
    <>
      <PageTop title="Add Brand" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Brand", link: "/dashboard/brand" },
        ]}
      />
      <BrandUI
        queryUrl={`${BACKEND_URL}/api/brand/add`}
        validationTag="brands"
        successMessage="Brand created successfully"
        serverAction={addData}
      />
    </>
  );
}
