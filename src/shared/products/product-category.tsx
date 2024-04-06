"use client";
import LoadingSkeleton from "@/components/native/LoadingSkeleton";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetcher } from "@/https/get-request";
import { XIcon } from "@/icons/Xicon";
import { site } from "@/site-config";
import useSWR from "swr";

export function ProductCategory({
  parent,
  setParent,
  selectedChildrens,
  setSelectedChildrens,
}: {
  parent?: string;
  setParent: (arg0?: string) => void;
  selectedChildrens: string[];
  setSelectedChildrens: (arg0: string[]) => void;
}) {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`${site.BACKEND_URL}/api/category/all`, fetcher);

  if (isLoading) {
    return (
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">Product Category</p>
        <div className="flex flex-col gap-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">Product Category</p>
        <p className="italic text-red-600">Something went wrong</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <p className="block mb-1 text-xl font-medium">
          Product Category <span className="text-red-600">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {parent && (
            <Badge variant="secondary" className="flex items-center">
              {parent}
              <XIcon className="ml-1" onClick={() => setParent(undefined)} />
            </Badge>
          )}
          {selectedChildrens.map((category, index) => {
            return (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center"
                onClick={() => {
                  setSelectedChildrens(
                    selectedChildrens.filter((_, i) => i !== index)
                  );
                }}
              >
                {category} <XIcon className="ml-1" />
              </Badge>
            );
          })}
        </div>
      </div>
      <ScrollArea className="w-full bg-white border rounded-md h-72 border-slate-200 dark:border-slate-800">
        <Accordion type="multiple" className="w-full px-2">
          {/* @ts-ignore */}
          {/* {categories?.data?.map((category: CategoryType, index) => {
            return (
              <AccordionItem key={index} value={category.name}>
                <AccordionTrigger
                  onClick={() => {
                    setParent(category.name);
                  }}
                >
                  {category.name}
                </AccordionTrigger>
                {category.children.map((item, index) => {
                  return (
                    <AccordionContent
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        if (!selectedChildrens.includes(item)) {
                          setSelectedChildrens([...selectedChildrens, item]);
                        }
                      }}
                    >
                      {item}
                    </AccordionContent>
                  );
                })}
              </AccordionItem>
            );
          })} */}
        </Accordion>
      </ScrollArea>
    </>
  );
}
