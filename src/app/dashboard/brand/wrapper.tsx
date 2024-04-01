import { brandColumn } from "@/columns/BrandColumn";
import { DataTable } from "@/components/native/DataTable";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import SixSkeleton from "@/components/native/SixSkeleton";
import TablePagination from "@/components/native/TablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { BrandType } from "@/types/brand.t";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Wrapper() {
  const [index, setIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>();
  const [filteredBrands, setFilteredBrands] = useState<BrandType[]>();
  const {
    data: brands,
    error,
    isLoading,
    mutate,
  } = useSWR<BrandType[]>(`/brand/page?page=${index}&limit=${limit}`, fetcher);
  const { data: filter } = useSWR<BrandType[]>(
    search && `/brand/search/${search}`,
    fetcher
  );

  useEffect(() => {
    if (search) {
      setFilteredBrands(filter);
    } else {
      setFilteredBrands(brands);
    }
  }, [filter, brands, search]);

  if (isLoading) {
    return <SixSkeleton />;
  }

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  // filter by dropdown
  const handleDropdown = (status: string) => {
    if (status === "ALL" || status === "") {
      setFilteredBrands(brands);
    } else {
      const temp = status === "ACTIVE" ? true : false;
      setFilteredBrands(brands?.filter((item) => item.status === temp));
    }
  };

  // filter by search
  const handleSearchFilter = (search: string): void => {
    setTimeout(() => {
      setSearch(search);
    }, 500);
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            onChange={(e) => handleDropdown(e.target.value)}
            className="mt-0.5 p-2 bg-gray-100 rounded-md"
          >
            <option value="ALL">ALL</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          <Button
            variant="outline"
            onClick={() => {
              mutate();
            }}
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>

      <div className="h-screen">
        {filteredBrands && (
          <DataTable column={brandColumn} data={filteredBrands} />
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center -mt-4 gap-4">
            <p>items per page </p>
            <select
              value={limit}
              className="mt-0.5  p-2 bg-gray-100 rounded-md"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <TablePagination
            index={index}
            setIndex={setIndex}
            disableNext={brands && brands.length < limit}
          />
        </div>
      </div>
    </div>
  );
}
