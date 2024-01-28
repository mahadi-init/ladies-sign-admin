import { BACKEND_URL } from "@/consts/site-info";
import PageTop from "@/components/native/PageTop";
import { DataTable } from "@/components/native/DataTable";
import { categoryColumn } from "./column";
import { CategoryType } from "./type";

const getCategories = async () => {
  const res = await fetch(`${BACKEND_URL}/api/category/all`, {
    next: { tags: ["category"] },
  });

  const data = await res.json();
  return data.result;
};

export default async function Page() {
  const categories: CategoryType[] = await getCategories();
  const searchTargets = ["_id", "parent"];

  return (
    <div>
      <PageTop title={"Category"} subTitle={"Edit or Add new category"} />
      <div className="flex flex-col p-2 mt-24 lg:justify-between lg:ml-72 lg:w-8/12 xl:flex-row xl:gap-8 xl:w-9/12 2xl:w-10/12">
        <DataTable
          columns={categoryColumn}
          data={categories}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/category/add"
        />
      </div>
    </div>
  );
}
