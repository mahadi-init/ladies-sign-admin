import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Orders() {
  const t = useTranslations("Orders");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
