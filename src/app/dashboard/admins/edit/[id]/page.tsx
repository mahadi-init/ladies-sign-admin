import { BACKEND_URL } from "@/consts/site-info";
import { patchData } from "@/actions/patch";
import getData from "@/actions/get";
import { AdminType } from "@/types/admin";
import SharedAdminUI from "@/ui/SharedAdminUI";

export default async function EditAdmin({
  params,
}: {
  params: { id: string };
}) {
  const adminRoles = ["Super Admin", "Admin", "Manager", "CEO"];
  const data = await getData<AdminType>(
    `${BACKEND_URL}/api/admin/get/${params.id}`,
    10,
  );

  return (
    <SharedAdminUI
      {...data}
      adminRoles={adminRoles}
      queryUrl={`${BACKEND_URL}/api/admin/update-stuff/${params.id}`}
      validationTag="admins"
      successMessage="Admin edited successfully"
      serverAction={patchData}
    />
  );
}
