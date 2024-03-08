"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveLine } from "@nivo/line";

function CurvedlineChart({
  data,
}: {
  data: { x: string; y: number }[];
}): JSX.Element {
  return (
    <ResponsiveLine
      data={[
        {
          id: "Report",
          data: data,
        },
        // {
        //   id: "Mobile",
        //   data: [
        //     { x: "Jan", y: 60 },
        //     { x: "Feb", y: 48 },
        //     { x: "Mar", y: 177 },
        //     { x: "Apr", y: 78 },
        //     { x: "May", y: 96 },
        //     { x: "Jun", y: 204 },
        //   ],
        // },
      ]}
      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
      xScale={{
        type: "point",
      }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 16,
      }}
      axisLeft={{
        tickSize: 0,
        tickValues: 5,
        tickPadding: 16,
      }}
      colors={["#2563eb", "#e11d48"]}
      pointSize={6}
      useMesh={true}
      gridYValues={6}
      theme={{
        tooltip: {
          chip: {
            borderRadius: "9999px",
          },
          container: {
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "6px",
          },
        },
        grid: {
          line: {
            stroke: "#f3f4f6",
          },
        },
      }}
      role="application"
    />
  );
}

export default function SalesStatistics({
  data,
}: {
  data: { date: string; total: number; order: number }[];
}) {
  const formattedSaleData = data.map((item) => {
    let x = item.date;
    let y = item.total;

    return { x: x, y: y };
  });

  const formattedOrderData = data.map((item) => {
    let x = item.date;
    let y = item.order;

    return { x: x, y: y };
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-semibold">Sales Statistics</h2>
      <Tabs defaultValue="sales">
        <TabsList className="grid grid-cols-2 w-full rounded-lg">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="report">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="w-full h-[300px]">
          <CurvedlineChart data={formattedSaleData} />
        </TabsContent>
        <TabsContent value="report" className="w-full h-[300px]">
          <CurvedlineChart data={formattedOrderData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
