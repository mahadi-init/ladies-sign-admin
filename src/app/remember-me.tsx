"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function RememberMe() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="remeber" onCheckedChange={() => setChecked(!checked)} />
      <label
        htmlFor="remember"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remember Me
      </label>
    </div>
  );
}
