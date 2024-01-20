import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Category() {
  const t = useTranslations("Category");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
