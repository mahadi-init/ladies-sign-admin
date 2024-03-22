import PageTop from "@/components/native/PageTop";
import getAllUsers from "@/utils/get-all-users";
import { User } from "@clerk/nextjs/server";
import Wrapper from "./Wrapper";

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

  return (
    <>
      <PageTop title="Users" />
      <Wrapper users={formattedUsers} />
    </>
  );
}
