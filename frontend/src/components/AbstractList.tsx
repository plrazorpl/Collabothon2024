import React from "react";
import { List, ListItem, Box } from "@mui/material";
import { Button } from "./Button/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface AbstractListElement {
	id: number;
}

interface AbstractListProps {
	elements: AbstractListElement[];
	generateElement: (elem: AbstractListElement) => React.ReactNode;
	onClick?: (index: number) => void;
	selectedSymbol?: number;
	onShowMore?: () => void;
	hasMore?: boolean;
	isHistory?: boolean;
}

// Styled components
const GradientOverlay = styled(Box)({
	position: "absolute",
	bottom: 0,
	left: 0,
	right: 0,
	height: "80px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "1rem",
	background:
		"linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,1) 100%)",
});

const ListContainer = styled(Box)({
	position: "relative",
});

const AbstractList: React.FC<AbstractListProps> = ({
	elements,
	generateElement,
	onClick,
	selectedSymbol,
	hasMore = true,
	isHistory = false
}) => {
	return (
		<ListContainer>
			<List
				sx={{
					backgroundColor: "#F1EFED",
					borderRadius: isHistory ? "0 0 1rem 1rem" : "1rem",
					padding: "0.5rem",
				}}
			>
				{elements.map((item, index) => {
					const isLastItem = index === elements.length - 1;

					return (
						<ListItem
							key={`${item.id}-${index}`}
							onClick={onClick ? () => onClick(index) : undefined}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								borderRadius: "1rem",
								padding: "1rem",
								cursor: onClick ? "pointer" : "default",
								backgroundColor: selectedSymbol === index ? "white" : "inherit",
								border: selectedSymbol === index ? "1px solid black" : "1px solid #F1EFED",
								opacity: isLastItem && hasMore ? 0.3 : 1,
								transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out",
								"&:hover": {
									backgroundColor: "white",
									border: "1px solid black",
								},
                marginBottom: "1rem",
							}}
						>
							{generateElement(item)}
						</ListItem>
					);
				})}
			</List>

			{hasMore && (
				<GradientOverlay>
					<Button bgColor={"#002E3C"} txtColor={"white"} bgHover={"#01394a"} endIcon={<ArrowForwardIcon />}>
						SHOW MORE
					</Button>
				</GradientOverlay>
			)}
		</ListContainer>
	);
};

export default AbstractList;
