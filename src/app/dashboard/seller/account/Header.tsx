"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className="flex w-full items-center justify-between bg-gray-100 p-4 font-bold">
      <div className="flex gap-4">
        <Link href={`/dashboard/sellers/profile?id=${id}&name=${name}`}>
          Profile
        </Link>
        <Link href={`/dashboard/sellers/profile/order?id=${id}&name=${name}`}>
          Order
        </Link>
      </div>
    </div>
  );
}
