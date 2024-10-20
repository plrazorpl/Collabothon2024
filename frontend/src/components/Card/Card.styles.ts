import { css } from "@emotion/react";

export const cardStyle = (backgroundColor: string, color: string) => css`
	background-color: ${backgroundColor};
	color: ${color};
	border-radius: 1rem;
	box-shadow: none;
	height: 9rem;
	padding: 0;
	transition: transform 0.3s ease-in-out;

	&:hover {
		-webkit-box-shadow: 4px 4px 0px 0px #ffd700;
		-moz-box-shadow: 4px 4px 0px 0px #ffd700;
		box-shadow: 4px 4px 0px 0px #ffd700;
		transform: translate(-4px, -4px);
	}
`;

export const cardHeaderStyle = css`
	padding: 0.8rem 0 0 1rem;
`;

export const cardContentStyle = css`
	padding: 0.5rem 0 0 1rem;
`;

export const cardActionsStyle = css`
	display: flex;
	justify-content: flex-end;
	margin-top: 0.5rem;
	padding: 0 0.8rem 0 0;
`;
