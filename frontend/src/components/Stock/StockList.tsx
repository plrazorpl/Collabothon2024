import React from "react";
import AbstractList from "../AbstractList";
import { Avatar, Typography, Box } from "@mui/material";
import { AbstractListElement, StockItem } from "../../types/types";

interface StockListProps {
  onClick: (index: number) => void;
  selectedSymbol: number;
  StockItemList: StockItem[];
}

const StockList: React.FC<StockListProps> = ({ onClick, selectedSymbol, StockItemList }: StockListProps) => {
  const generateElement = (elem: AbstractListElement) => {
    const stockItem = elem as StockItem;

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: stockItem.color,
              width: 40,
              height: 40,
              marginRight: 2,
              fontSize: 12
            }}
          >
            {stockItem.symbol.slice(0, 3)}
          </Avatar>
          <Box>
            <Typography variant="body1" color="textSecondary">{stockItem.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {stockItem.symbol}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body1" color="textSecondary">{stockItem.price.toFixed(1)}</Typography>
          <Typography variant="body2" color={stockItem.change > 0 ? "green" : "red"}>
            {stockItem.change} ({stockItem.changePercentage})
          </Typography>
        </Box>
      </>
    );
  };

  return (
    <AbstractList
      onClick={onClick}
      elements={StockItemList.slice(0, 4)}
      generateElement={generateElement}
      selectedSymbol={selectedSymbol}
    />
  );
};

export default StockList;
