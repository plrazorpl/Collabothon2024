import { css } from "@emotion/react";

export const productsContainerStyle = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
`;

export const productsHeaderStyle = css`
	display: flex;
	padding: 1.5rem;
	flex-wrap: wrap;
	gap: 2rem;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	@media (max-width: 510px) {
		gap: 0.8rem;
	}
`;

export const productsCardsStyle = css`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	width: 100%;
`;
