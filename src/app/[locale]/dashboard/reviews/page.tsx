"use client";
import { useTranslations } from "next-intl";
import PageTop from "../../../../components/native/PageTop";

export default function Reviews() {
  const t = useTranslations("Reviews");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
    </div>
  );
}
