import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
