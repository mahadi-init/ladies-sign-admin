import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import BrandUI from "@/shared/brands/BrandUI";
import { BrandType } from "@/shared/brands/brand.t";
import { BACKEND_URL } from "../../../../../../site-info";

export default async function EditBrand({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData<BrandType>(
    `${BACKEND_URL}/api/brand/get/${params.id}`,
    true
  );

  return (
    <>
      <PageTop title="Edit Brand" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Brand", link: "/dashboard/brand" },
        ]}
      />
      <BrandUI
        {...data}
        queryUrl={`${BACKEND_URL}/api/brand/edit/${params.id}`}
        validationTag="brands"
        successMessage="Brand edited successfully"
        serverAction={patchData}
      />
    </>
  );
}
