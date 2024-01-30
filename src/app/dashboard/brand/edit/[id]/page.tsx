import { BACKEND_URL } from "@/consts/site-info";
import SharedBrandUI from "../../_shared/ui";
import { editBrand } from "./_action";
import { BrandType } from "../../type";

const getBrandData = async (id: string): Promise<BrandType> => {
  const res = await fetch(`${BACKEND_URL}/api/brand/get/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
};

export default async function EditBrand({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBrandData(params.id);

  return <SharedBrandUI {...data} serverAction={editBrand} />;
}
