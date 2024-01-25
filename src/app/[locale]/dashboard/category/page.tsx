import { BACKEND_URL } from "@/consts/site-info";
import { getTranslations } from "next-intl/server";
import PageTop from "../../../../components/native/PageTop";
import { CategoryType } from "./type";
import CategoryWrapper from "./wrapper";

const getCategories = async () => {
  const res = await fetch(`${BACKEND_URL}/api/category/all`, {
    next: { tags: ["category"] },
  });

  const data = await res.json();
  return data.result;
};

export default async function Page() {
  const t = await getTranslations("Category");
  const categories: CategoryType[] = await getCategories();

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
      <CategoryWrapper data={categories} />
    </div>
  );
}
