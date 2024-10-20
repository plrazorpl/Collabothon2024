/** @jsxImportSource @emotion/react */
import React from "react";
import { Button as MUIButton } from "@mui/material";
import { buttonStyle } from "./Button.styles";

interface ButtonProps {
	variant?: "text" | "outlined" | "contained" | undefined;
    size?: "small" | "medium" | "large" | undefined;
	bgColor?: string;
    txtColor?: string;
	bgHover?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	hoverAnimation?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "contained",
    size,
	bgColor,
    txtColor,
	bgHover,
	startIcon,
	endIcon,
	hoverAnimation,
	children,
	onClick,
}) => {

	return (
		<MUIButton
			css={buttonStyle(bgColor, txtColor, bgHover, variant, hoverAnimation)}
			variant={variant}
            size={size}
			startIcon={startIcon}
			endIcon={endIcon}
			disableElevation={true}
			onClick={onClick}
		>
			{children}
		</MUIButton>
	);
};
