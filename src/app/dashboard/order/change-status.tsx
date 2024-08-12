"use client";
import { Badge, Dropdown } from "flowbite-react";
import { useState } from "react";
import { changeStatus } from "./action";
import { toast } from "sonner";

export const ChangeStatus = ({
  id,
  status,
}: {
  id?: string;
  status?: string;
}) => {
  const [clicked, setClicked] = useState(false);

  const getColor = () => {
    if (status === "WAITING") {
      return undefined;
    } else if (status === "DELIVERED") {
      return "success";
    } else if (status === "CANCELLED") {
      return "failure";
    } else {
      return "warning";
    }
  };

  const handleChangeStatus = async (status?: string) => {
    toast.promise(changeStatus(id, status), {
      loading: "Loading..",
      success: () => {
        return "Status changed";
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
          {status}
        </Badge>
      ) : (
        <Dropdown
          label={status}
          className="mt-0.5 rounded-md bg-gray-100 p-2"
          defaultValue={status}
          color={getColor()}
          size="sm"
        >
          <Dropdown.Item
            value="WAITING"
            onClick={() => handleChangeStatus("WAITING")}
          >
            WAITING
          </Dropdown.Item>
          <Dropdown.Item
            value="PROCESSING"
            onClick={() => handleChangeStatus("PROCESSING")}
          >
            PROCESSING
          </Dropdown.Item>
          <Dropdown.Item
            value="DELIVERED"
            onClick={() => handleChangeStatus("DELIVERED")}
          >
            DELIVERED
          </Dropdown.Item>
          <Dropdown.Item
            value="CANCELLED"
            onClick={() => handleChangeStatus("CANCELLED")}
          >
            CANCELLED
          </Dropdown.Item>
        </Dropdown>
      )}
    </>
  );
};
