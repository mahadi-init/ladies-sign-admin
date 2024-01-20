import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Reviews() {
  const t = useTranslations("Reviews");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
