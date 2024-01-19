import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Brand() {
  const t = useTranslations("Brand");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
