"use client";

import { Button } from "flowbite-react";

export default function ResetButton({
  style,
}: {
  style?: string;
}): JSX.Element {
  return (
    <Button type="reset" color="failure" className={style}>
      Reset
    </Button>
  );
}
