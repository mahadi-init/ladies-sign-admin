import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import ProfileUI from "@/shared/profile/ProfileUI";
import { BACKEND_URL } from "@/site-info";
import { ProfileType } from "@/types/profile.t";
import { cookies } from "next/headers";

const getSellerData = async (userId?: string) => {
  return await getData<ProfileType>(
    `${BACKEND_URL}/api/admin/get/${userId}`,
    true,
    10
  );
};

export default async function SellerProfile() {
  const userId = cookies().get("user-access-id");
  const seller = await getSellerData(userId?.name);

  return (
    <>
      <PageTop title="Seller Profile" />
      <ProfileUI data={seller} showBalance={true} />
    </>
  );
}
