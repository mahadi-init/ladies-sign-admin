"use client";
import NonIconDropdownSelect from "@/components/native/NonIconDropdown";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductResponse } from "./page";
import ProductItems from "./product-items";

export default function Wrapper({
  productTypes,
  products,
}: {
  productTypes: string[];
  products: ProductResponse[];
}) {
  const [dropdownFilter, setDropdownFilter] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<ProductResponse[]>(products);

  useEffect(() => {
    if (dropdownFilter === "ALL" || dropdownFilter === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.productType === dropdownFilter)
      );
    }
  }, [dropdownFilter, products]);

  const handleSearchFilter = (search: string): void => {
    setFilteredProducts(
      products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="my-8 flex justify-between items-center">
        <Input
          placeholder="search for product"
          className="w-5/12"
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <NonIconDropdownSelect
            placeholder="filter by type"
            items={["ALL", ...productTypes]}
            selectedItem={dropdownFilter}
            setSelectedItem={setDropdownFilter}
          />
          <Link
            href={`/dashboard/products/add`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        <ProductItems products={filteredProducts} />
      </div>
    </>
  );
}
