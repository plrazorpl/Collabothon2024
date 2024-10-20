import { css } from "@emotion/react";

export const chatbotHeaderStyle = css`
	background-color: #002e3c;
	border-radius: 1rem 1rem 0 0;
	color: #fff;
	padding: 1.5rem;
`;

export const chatWindowStyle = css`
	flex: 1;
	padding: 1.8rem;
	overflow-y: auto;
	height: 27rem;
	background-color: #f1efed;
	border-bottom: 1px solid #ddd;
`;

export const dialogLineContainerStyle = (isUser: boolean) => css`
	display: flex;
	justify-content: ${isUser ? "flex-end" : "flex-start"};
	margin-bottom: 1rem;
`;

export const dialogBubbleStyle = (isUser: boolean) => css`
	position: relative;
	padding: 1rem;
	background-color: ${isUser ? "#002E3C" : "#fbfbfb"};
	color: ${isUser ? "white" : "black"};
	border-radius: 20px;
	-webkit-box-shadow: 4px 4px 0px 0px #ffd700;
	-moz-box-shadow: 4px 4px 0px 0px #ffd700;
	box-shadow: 4px 4px 0px 0px #ffd700;
	max-width: 75%;
`;

export const userInputStyle = css`
	display: flex;
	align-items: center;
	padding: 1rem;
	background-color: #fbfbfe;
	border-radius: 0 0 1rem 1rem;
`;

export const iconButtonStyle = css`
	color: #002e3c;
	padding: 10px;
`;
