"use client";
import { Button } from "../ui/button";

/**
 * ResetButton component function.
 *
 * @param {{ style?: string }} style - The style prop for the button.
 * @return {JSX.Element} The reset button component.
 */
export default function ResetButton({
  style,
}: {
  style?: string;
}): JSX.Element {
  return (
    <Button type="reset" variant="destructive" className={style}>
      Reset
    </Button>
  );
}
