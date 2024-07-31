"use client";
import PageTop from "@/components/native/PageTop";

export default function Reviews() {
  // const { data, error } = useSWR<ReviewType[]>("/review/all", fetcher);

  // if (error) {
  //   return <FetchErrorMessage error={error} />;
  // }

  // const component = () => {
  //   if (!data) {
  //     return <SixSkeleton />;
  //   } else if (data.length === 0) {
  //     return <DataTable columns={reviewColumn} data={[]} />;
  //   } else {
  //     return <DataTable columns={reviewColumn} data={data} />;
  //   }
  // };

  return (
    <>
      <PageTop title="Reviews" />
      {/* <div className="mt-4">{component()}</div> */}
    </>
  );
}
