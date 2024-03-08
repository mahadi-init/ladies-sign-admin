import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { BrandType } from "@/shared/brands/brand.t";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Brand() {
  const brands = await getData<BrandType[]>(
    `${BACKEND_URL}/api/brand/all`,
    300,
    ["brand", "brands"]
  );

  return (
    <>
      <PageTop title="Brands" />
      {/* @ts-expect-error */}
      <Wrapper brands={brands.result} />
    </>
  );
}
