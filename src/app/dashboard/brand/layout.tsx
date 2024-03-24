import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/site-info";
import { BrandType } from "@/types/brand.t";
import Wrapper from "./Wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brands = await getData<BrandType[]>(
    `${BACKEND_URL}/api/brand/all`,
    true,
    300,
    ["brand", "brands"]
  );

  return (
    <>
      <PageTop title="Brands" />
      <div className="flex flex-col xl:flex-row justify-between gap-4 ">
        {children}
        <Wrapper brands={brands} />
      </div>
    </>
  );
}
