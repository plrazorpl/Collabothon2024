import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: StockDataPoint[];
  label?: React.ReactNode;
  yLabelGenerator: (value: number) => string;
  xLabelGenerator: (value: string) => string;
  getCustomXAxisTicks: (data: StockDataPoint[]) => number[];
}

interface StockDataPoint {
  date: string;
  price: number;
  fullIndex: number;
}

const Chart: React.FC<ChartProps> = ({ data, label, yLabelGenerator, xLabelGenerator, getCustomXAxisTicks }: ChartProps) => {
  const yAxisDomain = useMemo(() => {
    const prices = data.map((item) => item.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    const buffer = (maxPrice - minPrice) * 0.005;
    return [minPrice - buffer, maxPrice + buffer];
  }, [data]);

  // const getYAxisTicks = useMemo(() => {
  //   const [min, max] = yAxisDomain;
  //   const range = max - min;
  //   const targetTickCount = 5;
  //   const tickInterval = range / (targetTickCount - 1);

  //   const ticks: number[] = [];
  //   for (let i = 0; i < targetTickCount; i++) {
  //     ticks.push(Number((min + tickInterval * i).toFixed(2)));
  //   }
  //   return ticks;
  // }, [yAxisDomain]);  


  const formatXAxis = (tickItem: number): string => {
    const tickData = data.find((item) => item.fullIndex === tickItem);
    return tickData ? xLabelGenerator(tickData.date) : "";
  };

  const formatTooltipLabel = (value: number): string => {
    const pointData = data.find((item) => item.fullIndex === value);
    return !pointData ? "" : pointData.date;
  };


  return (
    <>
      {label}
      <Box sx={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="white" />
            <XAxis
              dataKey="fullIndex"
              ticks={getCustomXAxisTicks(data)}
              tickFormatter={formatXAxis}
              stroke="white"
              padding={{ right: 20, left: 20 }}
              tick={{
                fontSize: 12,
                textAnchor: 'middle',
              }}
            />
            <YAxis
              domain={yAxisDomain}
              hide={true}
              // ticks={getYAxisTicks}
              // stroke="rgba(0, 0, 0, 0.54)"
              // tickFormatter={(value) => yLabelGenerator(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                boxShadow:
                  "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              }}
              labelFormatter={formatTooltipLabel}
              formatter={(value: number) => [<span style={{color: "#002E3C"}}>`$${value.toFixed(2)}`, "Price"</span>]}
            />
            <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      </>
  );
};

export default Chart;
