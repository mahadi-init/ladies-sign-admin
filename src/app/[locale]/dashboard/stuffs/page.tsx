import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Stuffs() {
  const t = useTranslations("Stuffs");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
