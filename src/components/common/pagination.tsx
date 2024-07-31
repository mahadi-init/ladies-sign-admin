"use client";
import { Pagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TablePagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();

  // using search params
  const searchParams = useSearchParams();
  const index = searchParams.get("index") ?? "1";

  const handlePagination = (index: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("index", index.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={Number(index)}
      totalPages={totalPages === 0 ? 1 : totalPages}
      showIcons
      onPageChange={(index) => handlePagination(index)}
    />
  );
}
