import { css } from "@emotion/react";

export const widgetPaperStyle = (bgColor?: string, txtColor?: string) => css`
	border-radius: 1rem;
	padding: 1.8rem;
	background-color: ${bgColor};
	color: ${txtColor};
`;
