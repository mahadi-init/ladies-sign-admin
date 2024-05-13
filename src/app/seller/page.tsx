import SellerProfileUI from "@/ui/SellerProfileUI";
import { getAuthId } from "@/utils/get-auth-info";

export default async function SellerProfile() {
  const sellerId = await getAuthId();

  return <>{sellerId && <SellerProfileUI id={sellerId as string} />}</>;
}
