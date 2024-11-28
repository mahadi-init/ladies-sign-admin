"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", visitors: 187, fill: "var(--color-chrome)" },
  { month: "February", visitors: 200, fill: "var(--color-safari)" },
  { month: "March", visitors: 275, fill: "var(--color-firefox)" },
  { month: "April", visitors: 173, fill: "var(--color-edge)" },
  { month: "May", visitors: 90, fill: "var(--color-other)" },
  { month: "June", visitors: 187, fill: "var(--color-chrome)" },
  { month: "July", visitors: 300, fill: "var(--color-safari)" },
  { month: "August", visitors: 400, fill: "var(--color-firefox)" },
  { month: "September", visitors: 250, fill: "var(--color-edge)" },
  { month: "October", visitors: 100, fill: "var(--color-other)" },
  { month: "November", visitors: 200, fill: "var(--color-safari)" },
  { month: "December", visitors: 200, fill: "var(--color-edge)" },
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

export function Statistics() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales Statistics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center">
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
          <BarChart data={chartData} width={600} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month" // Updated to match `chartData` key
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" fill="#8884d8" strokeWidth={2} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
