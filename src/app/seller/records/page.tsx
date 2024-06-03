import { getAuthId } from "@/utils/get-auth-info";
import ShowRecords from "./ShowRecords";

export default async function Records() {
  const sellerID = await getAuthId();

  return <ShowRecords sellerID={sellerID as string} />;
}
