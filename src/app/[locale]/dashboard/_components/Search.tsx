import { useTranslations } from "next-intl";

export default function Search({
  search,
  setSearch,
  disable,
}: {
  search?: string;
  setSearch?: (arg0: string) => void;
  disable?: boolean;
}) {
  const t = useTranslations("Search");

  return (
    <div className="fixed px-4 w-full bg-white lg:ml-80 lg:w-8/12 xl:flex-row xl:w-9/12 2xl:w-10/12 top-[84px]">
      <input
        type="text"
        name="search"
        value={search}
        disabled={disable}
        placeholder={t("placeholder")}
        onChange={(e) => setSearch && setSearch(e.target.value)}
        className="block p-2 pl-4 w-full placeholder-gray-500 text-black bg-gray-50 rounded-full border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
      />
    </div>
  );
}
