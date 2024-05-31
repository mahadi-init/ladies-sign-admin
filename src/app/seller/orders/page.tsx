import { sellerOrderColumn } from "@/columns/SelllerOrderColumn";
import PageTop from "@/components/native/PageTop";
import SellerOrderUIWrapper from "@/ui/SellerOrderUIWrapper";
import { getAuthId } from "@/utils/get-auth-info";

export default async function Orders() {
  const sellerId = await getAuthId();

  return (
    <>
      <PageTop title="Orders" />
      <SellerOrderUIWrapper
        columns={sellerOrderColumn}
        orderRoute={`/seller/order/${sellerId}`}
        totalPageRoute={`/seller/order/total-pages/${sellerId}`}
        searchRoute={`/seller/order/search/${sellerId}`}
      />
    </>
  );
}
