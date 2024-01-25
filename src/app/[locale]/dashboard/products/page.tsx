import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Products() {
  const t = useTranslations("Products");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
