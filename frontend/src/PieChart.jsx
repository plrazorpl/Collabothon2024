import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Sample data
const data = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 300 },
  { name: "Category D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const InteractivePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Handle hover event
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Handle mouse leave
  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  //const res = fetch("localhost:8000/piechart_info/", {
    //method: "POST",
    //body: {currency: "UAH"}
  //})
  //console.log(res)

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={100}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke={activeIndex === index ? "#000000" : ""}
            strokeWidth={activeIndex === index ? 1 : 1} // Highlight with a thicker border
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
        <text
          x={205}
          y={205}
          textAnchor="middle"
          style={{ fontSize: "9px", fontWeight: "bold" }}
        >
          13371488
        </text>
    </PieChart>
  );
};

export default InteractivePieChart;