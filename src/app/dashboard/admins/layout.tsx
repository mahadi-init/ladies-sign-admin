import getData from "@/actions/get";
import { AdminType } from "@/app/dashboard/admins/admin.t";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admins = await getData<AdminType[]>(
    `${BACKEND_URL}/api/admin/all`,
    true,
    300,
    ["admins", "admin"]
  );

  return (
    <>
      <PageTop title="Admins" />
      <div className="flex flex-col xl:flex-row justify-between gap-4 ">
        {children}
        <Wrapper admins={admins} />
      </div>
    </>
  );
}
