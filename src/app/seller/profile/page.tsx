import getData from "@/actions/get";
import AccessDenied from "@/components/native/AccessDenied";
import PageTop from "@/components/native/PageTop";
import ProfileUI from "@/shared/profile/ProfileUI";
import { ProfileType } from "@/shared/profile/profile.t";
import { AccessToken } from "@/types/token.t";
import { cookies } from "next/headers";
import { BACKEND_URL } from "../../../../site-info";
import LogoutButton from "./logout-button";

const getSellerData = async (userId?: string) => {
  const data = await getData<ProfileType>(
    `${BACKEND_URL}/api/admin/get/${userId}`,
    true,
    10
  );

  return data;
};

export default async function SellerProfile(): Promise<JSX.Element> {
  const token = cookies().get("access-token");
  const userId = cookies().get("user-access-id");
  const seller = await getSellerData(userId?.name);

  if (token?.value !== AccessToken.SELLER) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <AccessDenied />
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageTop title="Seller Profile" />
      <ProfileUI data={seller} />
      <LogoutButton />
    </div>
  );
}
