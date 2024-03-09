import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { CategoryType } from "@/shared/categories/category.t";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Category() {
  const categories = await getData<CategoryType[]>(
    `${BACKEND_URL}/api/category/all`,
    300,
    ["category", "categories"]
  );

  return (
    <>
      <PageTop title="Category" />
      {/* @ts-expect-error */}
      <Wrapper categories={categories.data} />
    </>
  );
}
