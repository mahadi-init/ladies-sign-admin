"use client";

import { Dropdown } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Limit() {
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") ?? "25";

  const handleLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", limit as string);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown
      label={limit}
      className="mt-0.5 rounded-md bg-gray-100 p-2"
      defaultValue={limit}
      color="light"
    >
      <Dropdown.Item value="10" onClick={() => handleLimit("10")}>
        10
      </Dropdown.Item>
      <Dropdown.Item value="25" onClick={() => handleLimit("25")}>
        25
      </Dropdown.Item>
      <Dropdown.Item value="10" onClick={() => handleLimit("35")}>
        35
      </Dropdown.Item>
      <Dropdown.Item value="10" onClick={() => handleLimit("50")}>
        50
      </Dropdown.Item>
    </Dropdown>
  );
}
