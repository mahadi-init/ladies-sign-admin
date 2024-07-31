"use client";
import PageTop from "@/components/native/PageTop";
import { useEffect, useState } from "react";
import ExtraForm from "./form";

export default function Extra() {
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  const [rerender, setRerender] = useState(1);

  useEffect(() => {
    const colors = localStorage.getItem("colors");
    const sizes = localStorage.getItem("sizes");

    if (colors) {
      setColors(JSON.parse(colors));
    }

    if (sizes) {
      setSizes(JSON.parse(sizes));
    }
  }, [rerender]);

  return (
    <>
      <PageTop title="Extra" />
      <ExtraForm
        setRerender={setRerender}
        colors={colors as any}
        sizes={sizes as any}
      />
    </>
  );
}
