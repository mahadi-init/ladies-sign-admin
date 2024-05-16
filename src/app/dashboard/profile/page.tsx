import PageTop from "@/components/native/PageTop";
import AdminProfileUI from "@/ui/AdminProfileUI";
import { getAuthId } from "@/utils/get-auth-info";

export default async function Profile() {
  const adminID = await getAuthId();

  return (
    <>
      <PageTop title="Profile" />
      <>{adminID && <AdminProfileUI id={adminID as string} />}</>;
    </>
  );
}
