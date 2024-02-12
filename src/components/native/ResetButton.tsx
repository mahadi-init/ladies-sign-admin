"use client";
import { Button } from "../ui/button";

export default function ResetButton({ style }: { style?: string }) {
  return (
    <Button type="reset" variant="destructive" className={style}>
      Reset
    </Button>
  );
}
