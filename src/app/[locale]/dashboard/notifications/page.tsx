import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Notifications() {
  const t = useTranslations("Notifications");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
