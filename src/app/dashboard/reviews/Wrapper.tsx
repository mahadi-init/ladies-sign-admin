"use client";
import { DataTable } from "@/components/native/DataTable";
import DropdownSelect from "@/components/native/DropdownSelect";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reviewColumn } from "@/shared/reviews/ReviewColumn";
import { ReviewType } from "@/shared/reviews/review.t";
import {
  BadgePlus,
  LayoutDashboard,
  Tally1,
  Tally2,
  Tally3,
  Tally4,
  Tally5,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusItems = [
  {
    title: "ALL",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "5",
    icon: <Tally5 size={18} />,
  },
  {
    title: "4",
    icon: <Tally4 size={18} />,
  },
  {
    title: "3",
    icon: <Tally3 size={18} />,
  },
  {
    title: "2",
    icon: <Tally2 size={18} />,
  },
  {
    title: "1",
    icon: <Tally1 size={18} />,
  },
] as const;

export default function Wrapper({ reviews }: { reviews: ReviewType[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredReviews, setFilteredReviews] = useState<ReviewType[]>(reviews);

  //filter by status
  useEffect(() => {
    if (status === "ALL" || status === "") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(
        reviews.filter((item) => item.rating.toString() === status)
      );
    }
  }, [reviews, status]);

  //filter by search
  useEffect(() => {
    setFilteredReviews(
      reviews.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [reviews, search]);

  return (
    <div className="mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <Input
          className="w-fit"
          placeholder="filter item.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <DropdownSelect
            placeholder="Rating"
            items={statusItems}
            selectedItem={status}
            setSelectedItem={setStatus}
          />
          <Link
            href={"/dashboard/category/add"}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <DataTable columns={reviewColumn} data={filteredReviews} />
    </div>
  );
}
