import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Users() {
  const t = useTranslations("Users");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
