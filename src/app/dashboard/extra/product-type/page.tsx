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
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { SimpleTable } from "./table";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductTypeSchema = z.object({
  productType: z.string().min(2, "minimum 2 characters required"),
});

type zProductType = z.infer<typeof ProductTypeSchema>;

export default function ProductType() {
  const { data, isLoading, error } = useSWR<string[]>(
    "/extra/all/product-types",
    fetcher,
  );
  const { trigger, isMutating } = useSWRMutation(`/extra/add`, addRequest);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zProductType>({
    resolver: zodResolver(ProductTypeSchema),
  });

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  const onSubmit: SubmitHandler<zProductType> = async (data) => {
    const res = await trigger(data);
    showStatus("/extra", "Product Type added successfully", res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageTop title="Extra" />

      {isLoading ? (
        <SixSkeleton />
      ) : (
        <div className="w-full mt-8">
          <Card className="w-full p-2">
            <p className="text-lg font-medium text-center mb-2.5">
              Product Types
            </p>
            <SimpleTable heads={["Type"]} data={data} tag="productType" />
            <hr />
            <Input
              className="mt-2.5 bg-gray-100"
              placeholder="Add new Product Type"
              {...register("productType", { required: true })}
            />
            {errors.productType && (
              <span className="text-xs text-red-700">
                {errors.productType.message}
              </span>
            )}
          </Card>
        </div>
      )}
      <SubmitButton isMutating={isMutating} style="mt-8 w-full hidden" />
    </form>
  );
}
