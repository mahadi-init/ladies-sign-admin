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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const colorSchema = z.object({
  color: z.object({
    name: z.string().min(2, "minium 2 characters required"),
    code: z.string(),
  }),
});

type zColorType = z.infer<typeof colorSchema>;

export default function Color() {
  const { data, isLoading, error } = useSWR("/extra/all/colors", fetcher);
  const { trigger, isMutating } = useSWRMutation(`/extra/add`, addRequest);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zColorType>({
    resolver: zodResolver(colorSchema),
  });

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const onSubmit: SubmitHandler<zColorType> = async (data) => {
    const res = await trigger(data);
    showStatus("/extra", "Color added successfully", res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageTop title="Extra" />

      {isLoading ? (
        <SixSkeleton />
      ) : (
        <div className="w-full mt-8">
          <Card className="w-full p-2">
            <p className="text-lg font-medium text-center mb-2.5">Colors</p>
            <SimpleTable
              heads={["NAME", "CODE"]}
              data={data as { name: string; code: string }[]}
              tag="color"
            />
            <hr />
            <div className="flex items-center gap-2">
              <div className="w-full">
                <Input
                  className="mt-2.5 bg-gray-100"
                  placeholder="Add color name"
                  {...register("color.name", { required: true })}
                />
                {errors.color?.name && (
                  <span className="text-xs text-red-700">
                    {errors.color?.name.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Input
                  className="w-full mt-2.5 bg-gray-100"
                  type="color"
                  placeholder="Enter color code"
                  {...register("color.code", { required: true })}
                />

                <p className="text-xs">Choose the color</p>
              </div>
            </div>
          </Card>
        </div>
      )}
      <SubmitButton isMutating={isMutating} style="mt-8 w-full hidden" />
    </form>
  );
}
