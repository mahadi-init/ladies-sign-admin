import { getSellerData } from "../../data";
import SellerForm from "../../form";

export default async function EditSeller({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSellerData(params.id);

  return (
    <SellerForm
      {...JSON.parse(data)}
      message="Seller updated"
      actionType="edit"
    />
  );
}
