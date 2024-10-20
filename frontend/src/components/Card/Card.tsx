/** @jsxImportSource @emotion/react */
import React from "react";
import { Card as MUICard, CardHeader, CardContent, CardActions } from "@mui/material";
import { cardActionsStyle, cardContentStyle, cardHeaderStyle, cardStyle } from "./Card.styles";

interface CardProps {
	title?: React.ReactNode;
	avatar?: React.ReactNode;
	content: React.ReactNode;
	children?: React.ReactNode;
	disableSpacing?: boolean;
	variant?: "outlined" | "elevation";
	bgColor?: string;
	txtColor?: string;
}

export const Card: React.FC<CardProps> = ({
	title,
	avatar,
	content,
	children,
	disableSpacing,
	variant,
	bgColor = "#FBFBFE",
	txtColor = "inherit"
}) => {
	return (
		<MUICard variant={variant} css={cardStyle(bgColor, txtColor)}>
			<CardHeader avatar={avatar} title={title} css={cardHeaderStyle}></CardHeader>
			<CardContent css={cardContentStyle}>{content}</CardContent>
			<CardActions disableSpacing={disableSpacing} css={cardActionsStyle}>{children}</CardActions>
		</MUICard>
	);
};
