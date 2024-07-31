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
      <Dropdown.Item value="WAITING" onClick={() => handleStatus("WAITING")}>
        WAITING
      </Dropdown.Item>
      <Dropdown.Item
        value="PROCESSING"
        onClick={() => handleStatus("PROCESSING")}
      >
        PROCESSING
      </Dropdown.Item>
      <Dropdown.Item
        value="DELIVERED"
        onClick={() => handleStatus("DELIVERED")}
      >
        DELIVERED
      </Dropdown.Item>
      <Dropdown.Item
        value="CANCELLED"
        onClick={() => handleStatus("CANCELLED")}
      >
        CANCELLED
      </Dropdown.Item>
    </Dropdown>
  );
}
