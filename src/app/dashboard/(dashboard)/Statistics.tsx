"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/https/get-request";

const chartData = [
  { month: "January", visitors: 187, fill: "var(--color-chrome)" },
  { month: "Februray", visitors: 200, fill: "var(--color-safari)" },
  { month: "March", visitors: 275, fill: "var(--color-firefox)" },
  { month: "April", visitors: 173, fill: "var(--color-edge)" },
  { month: "May", visitors: 90, fill: "var(--color-other)" },
  { month: "June", visitors: 187, fill: "var(--color-chrome)" },
  { month: "July", visitors: 200, fill: "var(--color-safari)" },
  { month: "Auguest", visitors: 275, fill: "var(--color-firefox)" },
  { month: "September", visitors: 173, fill: "var(--color-edge)" },
  { month: "October", visitors: 90, fill: "var(--color-firefox)" },
  { month: "November", visitors: 90, fill: "var(--color-other)" },
  { month: "December", visitors: 90, fill: "var(--color-edge)" },
];

const chartConfig = {
  sales: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Statistics({
  data,
}: {
  data?: { _id: number; totalSales: number };
}) {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales Statistics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center">
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
