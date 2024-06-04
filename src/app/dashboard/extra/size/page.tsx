"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import PageTop from "@/components/native/PageTop";
import SixSkeleton from "@/components/native/SixSkeleton";
import SubmitButton from "@/components/native/SubmitButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import addRequest from "@/https/add-request";
import { fetcher } from "@/https/get-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { SimpleTable } from "./table";

const SizeTypeSchema = z.object({
  size: z.string().min(2, "minimum 2 characters required"),
});

type zSizeType = z.infer<typeof SizeTypeSchema>;

export default function ProductType() {
  const { data, isLoading, error } = useSWR<string[]>(
    "/extra/all/sizes",
    fetcher,
  );
  const { trigger, isMutating } = useSWRMutation(`/extra/add`, addRequest);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<zSizeType>({
    resolver: zodResolver(SizeTypeSchema),
  });

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const onSubmit: SubmitHandler<zSizeType> = async (data) => {
    const res = await trigger(data);
    showStatus("/extra", "Size added successfully", res);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageTop title="Extra" />

      {isLoading ? (
        <SixSkeleton />
      ) : (
        <div className="mt-8 w-full">
          <Card className="w-full p-2">
            <p className="mb-2.5 text-center text-lg font-medium">Sizes</p>
            <SimpleTable heads={["Type"]} data={data} tag="size" />
            <hr />
            <Input
              className="mt-2.5 bg-gray-100"
              placeholder="Add new Product Type"
              {...register("size", { required: true })}
            />
            {errors.size && (
              <span className="text-xs text-red-700">
                {errors.size.message}
              </span>
            )}
          </Card>
        </div>
      )}
      <SubmitButton isMutating={isMutating} style="mt-8 w-full hidden" />
    </form>
  );
}
