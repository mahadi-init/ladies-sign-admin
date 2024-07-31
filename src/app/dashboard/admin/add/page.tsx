import PageTop from "@/components/native/PageTop";
import AdminForm from "../form";

export default function AddAdmin() {
  return (
    <>
      <PageTop title="Add Admin" />
      <AdminForm actionType="add" message="Admin Created" />
    </>
  );
}
