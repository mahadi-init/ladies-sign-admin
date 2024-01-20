import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Stuffs() {
  const t = useTranslations("Stuffs");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
