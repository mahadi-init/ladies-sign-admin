"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Wrapper from "../_components/Wrapper";
import Table from "../_components/Table";
import PageTop from "../_components/PageTop";
import Search from "../_components/Search";

export default function Category() {
  const t = useTranslations("Category");
  const [search, setSearch] = useState("");

  return (
    <div>
      <PageTop title={t("title")} subTitle={t("sub-title")} />
      <Search search={search} setSearch={setSearch} />
      <Wrapper>
        <p>Image upload</p>
        <div>
          <Table />
        </div>
      </Wrapper>
    </div>
  );
}
