import { css } from "@emotion/react";

export const fabStyle = css`
	background-color: #ffd700;
	color: white;
	position: absolute;
	top: 15%;
	right: -1.5rem;
	transform: translateY(-50%);

	&:hover {
        background-color: #ffc400;
	    color: white;
	}
`;
