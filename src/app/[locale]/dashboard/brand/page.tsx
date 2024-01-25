import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Brand() {
  const t = useTranslations("Brand");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
