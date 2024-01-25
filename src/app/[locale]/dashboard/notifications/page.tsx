import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Notifications() {
  const t = useTranslations("Notifications");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
