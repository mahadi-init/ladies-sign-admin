"use client";

import { Dropdown } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TypeFilter() {
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "ALL";

  const handleStatus = (type: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("filterBy", "type");
    params.set("type", type as string);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown
      label={type}
      className="mt-0.5 rounded-md bg-gray-100 p-2"
      defaultValue={type}
      color="light"
    >
      <Dropdown.Item value="DEPOSIT" onClick={() => handleStatus("DEPOSIT")}>
        DEPOSIT
      </Dropdown.Item>
      <Dropdown.Item
        value="PAYMENT"
        onClick={() => handleStatus("PAYMENT")}
      >
        PAYMENT
      </Dropdown.Item>
    </Dropdown>
  );
}
