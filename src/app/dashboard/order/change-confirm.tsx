"use client";
import { Badge, Dropdown } from "flowbite-react";
import { useState } from "react";
import { changeConfirmation } from "./action";
import { toast } from "sonner";

export const ChangeConfirm = ({
  id,
  confirm,
}: {
  id?: string;
  confirm?: "OK" | "NO" | "HOLD";
}) => {
  const [clicked, setClicked] = useState(false);

  const getColor = () => {
    if (confirm === "NO") {
      return "failure";
    } else if (confirm === "OK") {
      return "success";
    } else {
      return "warning";
    }
  };

  const handleChangeConfirm = async (confirm?: "OK" | "NO" | "HOLD") => {
    toast.promise(changeConfirmation(id, confirm), {
      loading: "Loading..",
      success: () => {
        return "Confirmation changed";
      },
      error: () => {
        return "Update Failed";
      },
    });
  };

  return (
    <>
      {!clicked ? (
        <Badge
          onClick={() => setClicked(!clicked)}
          color={getColor()}
          className="text-md w-fit font-semibold"
        >
          {confirm}
        </Badge>
      ) : (
        <Dropdown
          label={confirm}
          className="mt-0.5 rounded-md bg-gray-100 p-2"
          defaultValue={confirm}
          color={getColor()}
          size="sm"
        >
          <Dropdown.Item value="NO" onClick={() => handleChangeConfirm("NO")}>
            NO
          </Dropdown.Item>
          <Dropdown.Item
            value="HOLD"
            onClick={() => handleChangeConfirm("HOLD")}
          >
            HOLD
          </Dropdown.Item>
          <Dropdown.Item value="OK" onClick={() => handleChangeConfirm("OK")}>
            OK
          </Dropdown.Item>
        </Dropdown>
      )}
    </>
  );
};
