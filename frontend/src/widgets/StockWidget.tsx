import React, { useState, useEffect } from "react";
import { WidgetContainer } from "../../src/components/WidgetContainer/WidgetContainer";
import StockList from "../components/Stock/StockList";
import StockChart from "../components/Stock/StockChart";
import { Box, Typography } from "@mui/material"; // Import MUI's Box for styling
import { StockDataPoint, StockItem } from "../types/types";

interface StockWidgetProps {
  userId: number;
}

interface StockData extends StockItem {
  data: StockDataPoint[];
}

const mulberry32 = (a: number): number => {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const generateMockStockData = (days: number, id: number, userId: number): StockDataPoint[] => {
  const selectedStock = mockData[userId].find((item) => item.id === id);

  if (!selectedStock) {
    throw new Error("Selected stock symbol not found");
  }

  const data: StockDataPoint[] = [];
  let price: number = selectedStock.price;
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const change: number = price * (mulberry32(i | id) * 0.06 - 0.03);
    price += change;

    data.push({
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      price: Number(price.toFixed(2)),
      fullIndex: i,
    });
  }

  return data; // Return just the data array
};

let mockData: StockData[][] = [
  [
    {
      id: 1,
      symbol: "SPXUSD",
      name: "S&P 500",
      price: 4290.6,
      change: 12.3,
      changePercentage: "+0.29%",
      color: "#009376",
      data: [],
    },
    {
      id: 2,
      symbol: "NSXUSD",
      name: "US 100",
      price: 14607.5,
      change: 44.1,
      changePercentage: "+0.30%",
      color: "#FF018C",
      data: [],
    },
    {
      id: 3,
      symbol: "DJI",
      name: "Dow 30",
      price: 33733.5,
      change: 73.5,
      changePercentage: "+0.22%",
      color: "#002E3C",
      data: [],
    },
    {
      id: 4,
      symbol: "NKY",
      name: "Nikkei 225",
      price: 32371.9,
      change: -56.85,
      changePercentage: "-0.18%",
      color: "#0299eb",
      data: [],
    },
    {
      id: 4,
      symbol: "NKY",
      name: "Nikkei 225",
      price: 32371.9,
      change: -56.85,
      changePercentage: "-0.18%",
      color: "#0299eb",
      data: [],
    },
    {
      id: 5,
      symbol: "FTSE",
      name: "FTSE 100",
      price: 7050.5,
      change: -12.5,
      changePercentage: "-0.18%",
      color: "#2C3E50",
      data: [],
    },
    {
      id: 6,
      symbol: "DAX",
      name: "DAX 30",
      price: 15300.2,
      change: 23.9,
      changePercentage: "+0.16%",
      color: "#3498DB",
      data: [],
    },
    {
      id: 7,
      symbol: "CAC",
      name: "CAC 40",
      price: 6820.1,
      change: 15.1,
      changePercentage: "+0.22%",
      color: "#E67E22",
      data: [],
    },
    {
      id: 8,
      symbol: "ASX",
      name: "ASX 200",
      price: 7400.9,
      change: -7.6,
      changePercentage: "-0.10%",
      color: "#16A085",
      data: [],
    },
  ],
  [
    {
      id: 9,
      symbol: "HSI",
      name: "Hang Seng",
      price: 24300.3,
      change: 55.2,
      changePercentage: "+0.23%",
      color: "#C0392B",
      data: [],
    },
    {
      id: 10,
      symbol: "SSE",
      name: "Shanghai Composite",
      price: 3500.5,
      change: 4.3,
      changePercentage: "+0.12%",
      color: "#8E44AD",
      data: [],
    },
    {
      id: 11,
      symbol: "TSX",
      name: "TSX",
      price: 20430.1,
      change: -35.1,
      changePercentage: "-0.17%",
      color: "#2980B9",
      data: [],
    },
    {
      id: 12,
      symbol: "AEX",
      name: "AEX",
      price: 725.3,
      change: 8.5,
      changePercentage: "+1.18%",
      color: "#27AE60",
      data: [],
    },
    {
      id: 13,
      symbol: "BSE",
      name: "BSE SENSEX",
      price: 59000.8,
      change: 140.7,
      changePercentage: "+0.24%",
      color: "#E74C3C",
      data: [],
    },
    {
      id: 14,
      symbol: "KOSPI",
      name: "KOSPI",
      price: 3000.2,
      change: -21.2,
      changePercentage: "-0.70%",
      color: "#9B59B6",
      data: [],
    },
  ],
  [
    {
      id: 15,
      symbol: "RTSI",
      name: "RTS Index",
      price: 1450.7,
      change: -10.5,
      changePercentage: "-0.72%",
      color: "#34495E",
      data: [],
    },
    {
      id: 16,
      symbol: "IBEX",
      name: "IBEX 35",
      price: 8900.9,
      change: 23.1,
      changePercentage: "+0.26%",
      color: "#F39C12",
      data: [],
    },
    {
      id: 17,
      symbol: "OMX",
      name: "OMX Stockholm 30",
      price: 2500.4,
      change: -8.1,
      changePercentage: "-0.32%",
      color: "#D35400",
      data: [],
    },
    {
      id: 18,
      symbol: "MIB",
      name: "FTSE MIB",
      price: 27000.3,
      change: 35.6,
      changePercentage: "+0.13%",
      color: "#1ABC9C",
      data: [],
    },
    {
      id: 19,
      symbol: "SMI",
      name: "Swiss Market Index",
      price: 12250.1,
      change: -5.2,
      changePercentage: "-0.04%",
      color: "#BDC3C7",
      data: [],
    },
    {
      id: 20,
      symbol: "TA35",
      name: "TA-35",
      price: 1800.9,
      change: 9.7,
      changePercentage: "+0.54%",
      color: "#7F8C8D",
      data: [],
    },
  ],
];

const StockWidget: React.FC<StockWidgetProps> = ({ userId }: StockWidgetProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState<number>(0);
  const [data, setData] = useState<StockData[] | null>(null);

  useEffect(() => {
    const fetchData = async (days: number) => {
      try {
        const data = mockData[userId - 1].map((item) => ({
          ...item,
          data: generateMockStockData(days, item.id, userId - 1),
        }));
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(1000);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <WidgetContainer width={"55rem"} height={"528.25px"} bgColor={"#002E3C"} txtColor={"white"}>
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "1rem 0 0 1rem" }}>
        Price {data[selectedSymbol].name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1, paddingRight: "1rem", display: "flex", height: '25rem', justifyContent: "center", alignItems: "center" }}>
          <StockChart selectedSymbol={selectedSymbol} data={data[selectedSymbol].data} />
        </Box>

        <Box sx={{ flex: 1, marginTop: "-2rem" }}>
          <StockList onClick={setSelectedSymbol} selectedSymbol={selectedSymbol} StockItemList={data} />
        </Box>
      </Box>
    </WidgetContainer>
  );
};

export default StockWidget;
