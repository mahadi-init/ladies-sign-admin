import { userColumn } from "@/columns/UserColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import getAllUsers from "@/utils/get-all-users";
import { User } from "@clerk/nextjs/server";

export interface SiteUser {
  id: string;
  banned: boolean;
  image: string;
  name: string;
  email: string;
  phone: string;
  lastSignInAt: number | null;
}

const formattedUser = (users: User[]) => {
  const data = users.map((user) => {
    return {
      id: user.id,
      banned: user.banned,
      image: user.imageUrl,
      name: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      phone: user.phoneNumbers[0]?.phoneNumber,
      lastSignInAt: user.lastSignInAt,
    };
  });

  return data;
};

export default async function Users() {
  const formattedUsers = formattedUser(await getAllUsers());

  //TODO:ADD SEARCH OPTION
  // const searchTargets = ["_id", "name", "email", "phone"];

  return (
    <>
      <PageTop title="Users" />
      {/* TODO:FROM THE FRONTEND ADD ID TO DATABASE */}
      <div className="mt-4 flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        <DataTable
          columns={userColumn}
          data={formattedUsers}
          // searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
