import getData from "@/actions/get";
import AccessDenied from "@/components/native/AccessDenied";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { ProfileType } from "@/types/profile";
import { AccessToken } from "@/types/token";
import SharedProfileUI from "@/ui/SharedProfileUI";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";

const getSellerData = async (userId?: string) => {
  const data = await getData<ProfileType>(
    `${BACKEND_URL}/api/admin/get/${userId}`,
    10
  );

  return data;
};

export default async function SellerProfile(): Promise<JSX.Element> {
  const token = cookies().get("access-token");
  const userId = cookies().get("user-access-id");
  const seller = await getSellerData(userId?.value);

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
      <SharedProfileUI data={seller} />
      <LogoutButton />
    </div>
  );
}
