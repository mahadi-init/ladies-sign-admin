import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/consts/site-info";
import { UserType } from "@/types/user";
import SharedUserUI from "@/ui/SharedUserUI";

const getUserData = async (id: string) => {
  const data = await getData<UserType>(`${BACKEND_URL}/api/user/${id}`, 10);
  return data;
};

export default async function EditUser({ params }: { params: { id: string } }) {
  const user = await getUserData(params.id);

  console.log(user);

  return (
    <SharedUserUI
      //@ts-expect-error
      {...user.data}
      queryUrl={`${BACKEND_URL}/api/user/update-user/${params.id}`}
      validationTag="users"
      successMessage="User edited successfully"
      serverAction={patchData}
    />
  );
}
