import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Coupons() {
  const t = useTranslations("Coupons");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
