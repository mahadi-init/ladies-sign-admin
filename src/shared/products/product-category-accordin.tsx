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
import { useState } from "react";
import useSWR from "swr";
import { BACKEND_URL } from "../../../site-info";
import { CategoryType } from "../categories/category.t";

export function ProductCategoryAccordin() {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`${BACKEND_URL}/api/category/all`, fetcher);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  return (
    <>
      <div className="my-4">
        <p className="block text-xl font-medium mb-1">Product Category</p>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category, index) => {
            return (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center"
                onClick={() => {
                  setSelectedCategories(
                    selectedCategories.filter((_, i) => i !== index)
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
                    if (!selectedCategories.includes(category.parent)) {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.parent,
                      ]);
                    }
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
                        if (!selectedCategories.includes(item)) {
                          setSelectedCategories([...selectedCategories, item]);
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
