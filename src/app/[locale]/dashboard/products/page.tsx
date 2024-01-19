import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Products() {
  const t = useTranslations("Products");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
