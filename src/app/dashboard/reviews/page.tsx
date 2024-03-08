import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { ReviewType } from "@/shared/reviews/review.t";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Reviews() {
  const reviews: ReviewType[] = await getData(
    `${BACKEND_URL}/api/review/all`,
    300,
    ["review", "reviews"]
  );

  return (
    <>
      <PageTop title="Reviews" />
      {/*@ts-expect-error*/}
      <Wrapper reviews={reviews.data} />
    </>
  );
}
