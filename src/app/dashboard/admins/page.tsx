import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { AdminType } from "@/shared/admins/admin.t";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Admin() {
  const admins = await getData<AdminType[]>(
    `${BACKEND_URL}/api/admin/all`,
    true,
    300,
    ["admins", "admin"]
  );

  return (
    <>
      <PageTop title="Admins" />
      <Wrapper admins={admins} />
    </>
  );
}
