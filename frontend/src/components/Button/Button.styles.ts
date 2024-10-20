import { css } from "@emotion/react";

// idk how does the border work in this configuration but I prefer not to investigate
export const buttonStyle = (
	bgColor?: string,
	txtColor?: string,
	bgHover?: string,
	variant?: "text" | "outlined" | "contained" | undefined,
	hoverAnimation?: boolean,
) => css`
	border-radius: 1rem;
	background-color: ${variant === "outlined" ? "transparent" : bgColor};
	color: ${txtColor};
	text-transform: none;
	border: ${variant === "outlined" ? `1px solid ${txtColor}` : "1px solid ${txtColor}"};
	border-color: ${variant === "outlined" ? `${txtColor}` : `${txtColor}`};
	transition: ${hoverAnimation ? "transform 0.3s ease-in-out" : "none"};

	&:hover {
		background-color: ${bgHover};
		box-shadow: ${hoverAnimation ? `4px 4px 0px 0px ${txtColor}` : "none"};
		transform: ${hoverAnimation ? "translate(-4px, -4px)" : "none"};
	}
`;
