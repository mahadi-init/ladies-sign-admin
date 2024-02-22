import getData from "@/actions/get";
import { reviewColumn } from "@/columns/ReviewColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { ReviewType } from "@/types/review";

export default async function Reviews() {
  const reviews: ReviewType[] = await getData(
    `${BACKEND_URL}/api/review/all`,
    300,
    ["review", "reviews"]
  );
  const searchTargets = ["_id", "product", "comment"];

  return (
    <>
      <PageTop title="Reviews" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        <DataTable
          columns={reviewColumn}
          //@ts-expect-error
          data={reviews.data}
          searchTargets={searchTargets}
        />
      </div>
    </>
  );
}
