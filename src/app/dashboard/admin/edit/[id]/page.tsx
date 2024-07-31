import AdminForm from "@/app/dashboard/admin/form";
import PageTop from "@/components/native/PageTop";
import { getAdmindata } from "../../data";

export default async function EditAdmin({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAdmindata(params.id);

  return (
    <>
      <PageTop title="Edit Admin" />
      <AdminForm
        {...JSON.parse(data)}
        _id={params.id}
        actionType="edit"
        message="Updated successfully"
      />
    </>
  );
}
