import { useTranslations } from "next-intl";
import PageTop from "../../../components/native/PageTop";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
