import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

//FIXME: Change the name
export default function Search({
  search,
  setSearch,
  addItemtext,
  isAddItem,
  setIsAddItem,
}: {
  search: string;
  setSearch: (arg0: string) => void;
  addItemtext: string;
  isAddItem: boolean;
  setIsAddItem: (argo: boolean) => void;
}) {
  const t = useTranslations("Search");

  return (
    <div className="flex fixed gap-4 px-4 w-full bg-white lg:ml-72 lg:w-8/12 xl:flex-row xl:w-9/12 2xl:w-10/12 top-[84px]">
      <Input
        type="text"
        name="search"
        value={search}
        placeholder={t("placeholder")}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-full"
      />
      {!isAddItem && (
        <Button onClick={() => setIsAddItem(true)} className="rounded-full">
          <span>{addItemtext}</span>
        </Button>
      )}
    </div>
  );
}
