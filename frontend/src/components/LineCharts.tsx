"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LineCharts = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Sample data matching the structure of your original data
  const initialChartData = Array.from({ length: 61 }, (_, i) => {
    const date = new Date(2024, 3, 1 + i); // Start from April 1st, 2024
    return {
      name: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      May: Math.floor(Math.random() * 2000) + 3000,
      April: Math.floor(Math.random() * 1500) + 3000,
      March: Math.floor(Math.random() * 1500) + 2000,
      February: Math.floor(Math.random() * 1500) + 1500,
    };
  });

  const [chartData, setChartData] = React.useState(initialChartData);

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date();
    let daysToShow = 90;
    if (timeRange === "30d") {
      daysToShow = 30;
    } else if (timeRange === "7d") {
      daysToShow = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToShow);

    return chartData.filter((item) => {
      const datePart = item.name.split(" ")[1]; // Get the day number
      const monthPart = item.name.split(" ")[0]; // Get the month abbreviation
      const year = referenceDate.getFullYear(); // Use current year for comparison

      const itemDate = new Date(`${monthPart} ${datePart}, ${year}`);
      return itemDate >= startDate;
    });
  }, [chartData, timeRange]);

  const chartConfig = React.useMemo(() => ({
    May: {
      label: "May",
      color: "hsl(var(--chart-1))", // You might need to define these CSS variables
    },
    April: {
      label: "April",
      color: "hsl(var(--chart-2))",
    },
    March: {
      label: "March",
      color: "hsl(var(--chart-3))",
    },
    February: {
      label: "February",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig), []);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Showing data trends over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
              domain={[0, 7000]}
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              labelFormatter={(value) => value}
            />
            <Area
              type="monotone"
              dataKey="May"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1) / 0.3)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="April"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2) / 0.3)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="March"
              stroke="hsl(var(--chart-3))"
              fill="hsl(var(--chart-3) / 0.3)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="February"
              stroke="hsl(var(--chart-4))"
              fill="hsl(var(--chart-4) / 0.3)"
              strokeWidth={2}
              stackId="a"
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              layout="horizontal"
              wrapperStyle={{ paddingTop: "15px" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineCharts;