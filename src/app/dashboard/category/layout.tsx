import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/site-info";
import { CategoryType } from "@/types/category.t";
import Wrapper from "./Wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getData<CategoryType[]>(
    `${BACKEND_URL}/api/category/all`,
    true,
    300,
    ["category", "categories"]
  );
  return (
    <>
      <PageTop title="Category" />
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        {children}
        <Wrapper categories={categories} />
      </div>
    </>
  );
}
