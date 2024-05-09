"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import PageTop from "@/components/native/PageTop";
import { SimpleTable } from "@/components/native/SimpleTable";
import SixSkeleton from "@/components/native/SixSkeleton";
import SubmitButton from "@/components/native/SubmitButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import { ExtraType } from "@/types/extra.t";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Settings() {
  const { data, isLoading, error } = useSWR<ExtraType>("/extra/all", fetcher);
  const { trigger, isMutating } = useSWRMutation(`/extra/add`, addRequest);
  const { showStatus } = useStatus();
  const [input, setInputs] = useState({
    productType: "",
    color: {
      name: "",
      code: "",
    },
    size: "",
  });

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const handleSubmit = async () => {
    const res = await trigger(input);
    showStatus("/extra", "Extra added successfully", res);
  };

  return (
    <form action={handleSubmit}>
      <PageTop title="Extra" />
      <p className="mt-4 mb-4 font-mono text-2xl font-semibold text-center">
        Configuration
      </p>

      {isLoading ? (
        <SixSkeleton />
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 mt-4 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="w-full p-2">
            <p className="text-lg font-medium text-center mb-2.5">
              Product Types
            </p>
            <SimpleTable heads={["Type"]} data={data?.productTypes} />
            <hr />
            <Input
              className="mt-2.5 bg-gray-100"
              placeholder="Add new Product Type"
              onChange={(e) =>
                setInputs({ ...input, productType: e.target.value })
              }
            />
          </Card>
          <Card className="w-full p-2">
            <p className="text-lg font-medium text-center mb-2.5">Colors</p>
            <SimpleTable heads={["name", "code"]} data={data?.colors} />
            <hr />
            <div className="flex items-center gap-2">
              <Input
                className="mt-2.5 bg-gray-100"
                placeholder="Add color name"
                onChange={(e) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    color: {
                      ...prevState.color,
                      name: e.target.value,
                    },
                  }))
                }
              />
              <Input
                className="mt-2.5 bg-gray-100"
                type="color"
                placeholder="Enter color code"
                onChange={(e) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    color: {
                      ...prevState.color,
                      code: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </Card>
          <Card className="w-full p-2">
            <p className="text-lg font-medium text-center mb-2.5">Sizes</p>
            <SimpleTable heads={["Size"]} data={data?.sizes} />
            <hr />
            <Input
              className="mt-2.5 bg-gray-100"
              placeholder="Add new size"
              onChange={(e) => setInputs({ ...input, size: e.target.value })}
            />
          </Card>
        </div>
      )}
      <SubmitButton isMutating={isMutating} style="mt-8 w-full hidden" />
    </form>
  );
}
