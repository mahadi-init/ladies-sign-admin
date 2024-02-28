import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { Breadcrumbs } from "@/components/native/Breadcrumbs";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { AdminType } from "@/types/admin";
import SharedAdminUI from "@/ui/SharedAdminUI";

const getAdminData = async (id: string) => {
  const data = await getData<AdminType>(
    `${BACKEND_URL}/api/admin/get/${id}`,
    10
  );

  return data;
};

export default async function EditAdmin({
  params,
}: {
  params: { id: string };
}) {
  const adminRoles = ["Admin", "Editor", "Seller"];
  const data = await Promise.all([adminRoles, await getAdminData(params.id)]);

  return (
    <>
      <PageTop title="Edit Admin" showSubTitle={false} />
      <Breadcrumbs
        props={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Admin", link: "/dashboard/admins" },
        ]}
      />
      <SharedAdminUI
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
