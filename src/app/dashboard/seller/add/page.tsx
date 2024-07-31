import PageTop from "@/components/native/PageTop";
import SellerForm from "../form";

export default async function AddSeller() {
  return (
    <>
      <PageTop title="Add Seller" />
      <SellerForm message="Seller created" actionType="add" />
    </>
  );
}
