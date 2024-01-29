"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTop() {
  const pathname = usePathname();
  const [info, setInfo] = useState({
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    if (pathname.endsWith("category")) {
      setInfo({
        title: "Category",
        subTitle: "View and add category",
      });

      return;
    }

    if (pathname.includes("edit")) {
      setInfo({
        title: "Edit Category",
        subTitle: "Edit existing category",
      });

      return;
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 w-full bg-white">
      <p className="mt-4 text-2xl font-semibold text-center">{info.title}</p>
      <p className="text-sm text-center">{info.subTitle}</p>
      <hr className="my-2" />
    </div>
  );
}
