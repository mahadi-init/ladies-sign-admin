import { useTranslations } from "next-intl";
import PageTop from "../_components/PageTop";

export default function Profile() {
  const t = useTranslations("Profile");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
