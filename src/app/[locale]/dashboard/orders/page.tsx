import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Orders() {
  const t = useTranslations("Orders");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
