/** @jsxImportSource @emotion/react */
import React from "react";
import Paper from "@mui/material/Paper";
import { widgetPaperStyle } from "./WidgetContainer.styles";

interface WidgetContainerProps {
  children: React.ReactNode;
  elevation?: number;
  width: string;
  height: string;
  bgColor?: string;
  txtColor?: string;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  elevation = 3,
  width,
  height,
  bgColor = "#fbfbfe",
  txtColor = "inherit",
}) => {
  const style = widgetPaperStyle(bgColor);

  return (
    <Paper
      variant="elevation"
      elevation={elevation}
      css={style}
      sx={{
        width: width,
        height: height,
        color: txtColor,
      }}
    >
      {children}
    </Paper>
  );
};
