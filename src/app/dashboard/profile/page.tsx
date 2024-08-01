import AdminForm from "@/app/dashboard/profile/form";
import { auth } from "@/auth";
import PageTop from "@/components/native/PageTop";
import { AdminType } from "@/types/admin";
import { getAdminData } from "./data";

export default async function Profile() {
  const session = await auth();
  const data = await getAdminData(session?.user.id);

  return (
    <>
      <PageTop title="Profile" />
      <AdminForm data={JSON.parse(data) as AdminType} />
    </>
  );
}
