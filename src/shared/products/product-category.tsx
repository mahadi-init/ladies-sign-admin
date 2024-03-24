"use client";
import LoadingSkeleton from "@/components/native/LoadingSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "@/icons/Xicon";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { BACKEND_URL } from "../../site-info";
import { CategoryType } from "../../types/category.t";

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
  } = useSWR(`${BACKEND_URL}/api/category/all`, fetcher);

  if (isLoading) {
    return (
      <div className="my-4">
        <p className="block text-xl font-medium mb-1">Product Category</p>
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
        <p className="block text-xl font-medium mb-1">Product Category</p>
        <p className="text-red-600 italic">Something went wrong</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <p className="block text-xl font-medium mb-1">
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
      <ScrollArea className="h-72 w-full rounded-md border border-slate-200 bg-white dark:border-slate-800">
        <Accordion type="multiple" className="w-full px-2">
          {/* @ts-ignore */}
          {categories?.data?.map((category: CategoryType, index) => {
            return (
              <AccordionItem key={index} value={category.parent}>
                <AccordionTrigger
                  onClick={() => {
                    setParent(category.parent);
                  }}
                >
                  {category.parent}
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
          })}
        </Accordion>
      </ScrollArea>
    </>
  );
}
