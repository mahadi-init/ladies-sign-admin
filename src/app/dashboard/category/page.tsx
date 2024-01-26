import { BACKEND_URL } from "@/consts/site-info";
import { CategoryType } from "./type";
import CategoryWrapper from "./wrapper";
import PageTop from "@/components/native/PageTop";

const getCategories = async () => {
  const res = await fetch(`${BACKEND_URL}/api/category/all`, {
    next: { tags: ["category"] },
  });

  const data = await res.json();
  return data.result;
};

export default async function Page() {
  const categories: CategoryType[] = await getCategories();

  return (
    <div>
      <PageTop title={"Category"} subTitle={"Edit or Add new category"} />
      <CategoryWrapper data={categories} />
    </div>
  );
}
