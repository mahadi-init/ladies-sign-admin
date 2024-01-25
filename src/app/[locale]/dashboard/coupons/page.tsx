import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Coupons() {
  const t = useTranslations("Coupons");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
