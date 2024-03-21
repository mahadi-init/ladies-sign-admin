import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import AdminUI from "@/app/dashboard/admins/AdminUI";
import { AdminType } from "@/app/dashboard/admins/admin.t";
import { BACKEND_URL } from "../../../../../../site-info";

const getAdminData = async (id: string) => {
  const data = await getData<AdminType>(
    `${BACKEND_URL}/api/admin/get/${id}`,
    true
  );

  return data;
};

export default async function EditAdmin({
  params,
}: {
  params: { id: string };
}) {
  const adminRoles = ["SELLER", "EDITOR", "ADMIN", "SUPERADMIN"];
  const data = await Promise.all([adminRoles, await getAdminData(params.id)]);

  return (
    <>
      <AdminUI
        {...data[1]}
        adminRoles={data[0]}
        queryUrl={`${BACKEND_URL}/api/admin/update-stuff/${params.id}`}
        validationTag="admins"
        successMessage="Admin edited successfully"
        serverAction={patchData}
      />
    </>
  );
}
