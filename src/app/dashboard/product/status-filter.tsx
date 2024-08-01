"use client";

import { Dropdown } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StatusFilter() {
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "ALL";

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("filterBy", "status");
    params.set("status", status as string);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown
      label={status}
      className="mt-0.5 rounded-md bg-gray-100 p-2"
      defaultValue={status}
      color="light"
    >
      <Dropdown.Item value="IN-STOCK" onClick={() => handleStatus("IN-STOCK")}>
        IN-STOCK
      </Dropdown.Item>
      <Dropdown.Item
        value="OUT-OF-STOCK"
        onClick={() => handleStatus("OUT-OF-STOCK")}
      >
        OUT-OF-STOCK
      </Dropdown.Item>
      <Dropdown.Item
        value="DISCONTINED"
        onClick={() => handleStatus("DISCONTINED")}
      >
        DISCONTINED
      </Dropdown.Item>
    </Dropdown>
  );
}
