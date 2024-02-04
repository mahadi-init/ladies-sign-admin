import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";
import { patchData } from "@/actions/patch";
import getData from "@/actions/get";
import SharedBrandUI from "@/ui/SharedBrandUI";

export default async function EditBrand({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData<BrandType>(
    `${BACKEND_URL}/api/brand/get/${params.id}`,
    10,
  );

  return (
    <SharedBrandUI
      {...data}
      queryUrl={`${BACKEND_URL}/api/brand/edit/${params.id}`}
      validationTag="brands"
      successMessage="Brand edited successfully"
      serverAction={patchData}
    />
  );
}
