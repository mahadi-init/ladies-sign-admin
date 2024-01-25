import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Profile() {
  const t = useTranslations("Profile");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
