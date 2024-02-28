import getData from "@/actions/get";
import { brandColumn } from "@/columns/BrandColumn";
import { DataTable } from "@/components/native/DataTable";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { BrandType } from "@/types/brand";

export default async function Brand() {
  const brands = await getData<BrandType[]>(
    `${BACKEND_URL}/api/brand/all`,
    300,
    ["brand", "brands"],
  );
  const searchTargets = ["_id", "name"];

  return (
    <>
      <PageTop title="Brand" />
      <div className="flex flex-col 2xl:flex-row 2xl:gap-2 2xl:justify-between">
        <DataTable
          columns={brandColumn}
          //@ts-expect-error
          data={brands.result}
          searchTargets={searchTargets}
          addItemRoute="/dashboard/brand/add"
        />
      </div>
    </>
  );
}
