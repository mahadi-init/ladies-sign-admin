import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";

export default function Profile() {
  const t = useTranslations("Profile");

  return (
    <div>
      <PageTitle title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
