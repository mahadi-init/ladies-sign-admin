import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/site-info";
import { BrandType } from "../../../../../types/brand.t";
import BrandUI from "../../BrandUI";

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
    <BrandUI
      {...data}
      queryUrl={`${BACKEND_URL}/api/brand/edit/${params.id}`}
      validationTag="brands"
      successMessage="Brand edited successfully"
      serverAction={patchData}
    />
  );
}
