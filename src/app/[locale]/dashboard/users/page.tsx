import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Users() {
  const t = useTranslations("Users");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
