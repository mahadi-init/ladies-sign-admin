import { cookies } from "next/headers";

export default function Dashboard() {
  const role = cookies().get("role-token");

  return <>{role?.value}</>;
}
