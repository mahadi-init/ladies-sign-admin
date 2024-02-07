import { BACKEND_URL } from "@/consts/site-info";
import { patchData } from "@/actions/patch";
import getData from "@/actions/get";
import { AdminType } from "@/types/admin";
import SharedAdminUI from "@/ui/SharedAdminUI";

const getAdminData = async (id: string) => {
  const data = await getData<AdminType>(
    `${BACKEND_URL}/api/admin/get/${id}`,
    10,
  );

  return data;
};

export default async function EditAdmin({
  params,
}: {
  params: { id: string };
}) {
  //TODO:FETCH from API
  const adminRoles = ["Super Admin", "Admin", "Manager", "CEO"];
  const data = await Promise.all([adminRoles, await getAdminData(params.id)]);

  return (
    <SharedAdminUI
      {...data[1]}
      adminRoles={data[0]}
      queryUrl={`${BACKEND_URL}/api/admin/update-stuff/${params.id}`}
      validationTag="admins"
      successMessage="Admin edited successfully"
      serverAction={patchData}
    />
  );
}
