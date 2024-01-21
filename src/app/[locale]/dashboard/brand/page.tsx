"use client";
import { useTranslations } from "next-intl";
import PageTop from "../_components/PageTop";
import { useState } from "react";
import Search from "../_components/Search";

export default function Brand() {
  const t = useTranslations("Brand");
  const [search, setSearch] = useState("");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
      <Search search={search} setSearch={setSearch} />
    </div>
  );
}
