"use client";
import PageTop from "@/components/native/PageTop";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { ReviewType } from "@/types/review.t";
import useSWR from "swr";

export default function Reviews() {
  const { data } = useSWR<ReviewType[]>("/review/all", fetcher);

  return (
    <>
      <PageTop title="Reviews" />
      <div className="mt-4 flex flex-col gap-4 ">
        <div className="flex items-center justify-between ">
          <Input
            className="w-fit"
            placeholder="filter item.."
            // onChange={(e) => handleSearchFilter(e.target.value)}
          />
          <div className="flex gap-2"></div>
        </div>
        {/* <DataTable column={reviewColumn} data={filteredReviews} /> */}
      </div>
    </>
  );
}
