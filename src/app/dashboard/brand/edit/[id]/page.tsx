import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";
import SharedBrandUI from "@/ui/SharedBrandUI";

export default async function EditBrand({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData<BrandType>(
    `${BACKEND_URL}/api/brand/get/${params.id}`,
    0
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
      <SharedBrandUI
        {...data}
        queryUrl={`${BACKEND_URL}/api/brand/edit/${params.id}`}
        validationTag="brands"
        successMessage="Brand edited successfully"
        serverAction={patchData}
      />
    </>
  );
}
