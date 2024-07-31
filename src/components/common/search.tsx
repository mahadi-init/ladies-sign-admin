"use client";

import { FloatingLabel } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const { replace } = useRouter();
  const pathname = usePathname();

  // using search params
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  // handle search with 300 ms delay count
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("index", "1");

    if (value && value !== "") {
      params.set("filterBy", "search");
      params.set("q", value.trim() as string);
    } else {
      params.delete("q");
      params.set("filterBy", "default");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <FloatingLabel
      variant="outlined"
      label="search"
      className="w-fit"
      autoFocus
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={search as string}
    />
  );
}
