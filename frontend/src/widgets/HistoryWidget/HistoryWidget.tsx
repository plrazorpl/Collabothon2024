/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import HistoryList from "../../components/HistoryList";
import { HistoryDataElement } from "../../types/types";
import { WidgetContainer } from "../../components/WidgetContainer/WidgetContainer";
import { Box, Button, Typography } from "@mui/material";
import { historyButtonsStyle, historyHeaderStyle } from "./HistoryWidget.styles";

const data: HistoryDataElement[][] = [
	[
		{
			id: 1,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-07-14 12:00",
			amount: 100,
			currency: "USD",
			targetCurrency: "EUR",
			originalAmount: 100,
			exchangedAmount: 90,
		},
		{
			id: 2,
			transactionType: "INVESTMENT",
			transactionDate: "2021-07-14 12:00",
			currency: "USD",
			amount: 100,
			stockName: "AAPL",
		},
		{
			id: 3,
			transactionType: "LOAN",
			transactionDate: "2021-07-14 12:00",
			description: "Mortgage",
			loanAmount: 1000,
			amount: 1000,
			currency: "USD",
		},
		{
			id: 4,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-07-14 12:00",
			description: "John Doe",
			amount: -100,
			currency: "USD",
		},
		{
			id: 5,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-08-01 09:30",
			amount: 200,
			currency: "USD",
			targetCurrency: "GBP",
			originalAmount: 200,
			exchangedAmount: 150,
		},
		{
			id: 6,
			transactionType: "INVESTMENT",
			transactionDate: "2021-08-01 09:30",
			currency: "USD",
			amount: 500,
			stockName: "GOOGL",
		},
		{
			id: 7,
			transactionType: "LOAN",
			transactionDate: "2021-08-01 09:30",
			description: "Car Loan",
			loanAmount: 15000,
			amount: 15000,
			currency: "USD",
		},
		{
			id: 8,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-08-01 09:30",
			description: "Alice Smith",
			amount: -250,
			currency: "USD",
		},
		{
			id: 9,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-08-15 14:45",
			amount: 150,
			currency: "EUR",
			targetCurrency: "GPB",
			originalAmount: 150,
			exchangedAmount: 20000,
		},
		{
			id: 10,
			transactionType: "INVESTMENT",
			transactionDate: "2021-08-15 14:45",
			currency: "USD",
			amount: 800,
			stockName: "AMZN",
		},
		{
			id: 101,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-08-15 14:45",
			description: "Weekly Salary",
			amount: 1200,
			currency: "USD",
		},
		{
			id: 102,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-08-01 09:30",
			description: "Bill Payment",
			amount: -250,
			currency: "EUR",
		},
	],
	[
		{
			id: 11,
			transactionType: "LOAN",
			transactionDate: "2021-08-15 14:45",
			description: "Personal Loan",
			loanAmount: 5000,
			amount: 5000,
			currency: "USD",
		},
		{
			id: 12,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-08-15 14:45",
			description: "Rent Payment",
			amount: -1200,
			currency: "USD",
		},
		{
			id: 13,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-09-01 16:00",
			amount: 300,
			currency: "PLN",
			targetCurrency: "USD",
			originalAmount: 300,
			exchangedAmount: 240,
		},
		{
			id: 14,
			transactionType: "INVESTMENT",
			transactionDate: "2021-09-01 16:00",
			currency: "USD",
			amount: 1000,
			stockName: "TSLA",
		},
		{
			id: 15,
			transactionType: "LOAN",
			transactionDate: "2021-09-01 16:00",
			description: "Home Renovation Loan",
			loanAmount: 8000,
			amount: 8000,
			currency: "USD",
		},
		{
			id: 16,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-09-01 16:00",
			description: "Gift to Brother",
			amount: -500,
			currency: "USD",
		},
		{
			id: 17,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-09-15 11:30",
			amount: 250,
			currency: "USD",
			targetCurrency: "EUR",
			originalAmount: 250,
			exchangedAmount: 320,
		},
		{
			id: 18,
			transactionType: "INVESTMENT",
			transactionDate: "2021-09-15 11:30",
			currency: "USD",
			amount: 600,
			stockName: "NFLX",
		},
		{
			id: 19,
			transactionType: "LOAN",
			transactionDate: "2021-09-15 11:30",
			description: "Student Loan",
			loanAmount: 12000,
			amount: 12000,
			currency: "USD",
		},
		{
			id: 20,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-09-15 11:30",
			description: "Charity Donation",
			amount: -200,
			currency: "USD",
		},
	],
	[
		{
			id: 21,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-09-20 10:00",
			amount: 400,
			currency: "USD",
			targetCurrency: "GPB",
			originalAmount: 400,
			exchangedAmount: 550,
		},
		{
			id: 22,
			transactionType: "INVESTMENT",
			transactionDate: "2021-09-20 10:00",
			currency: "USD",
			amount: 1200,
			stockName: "MSFT",
		},
		{
			id: 23,
			transactionType: "LOAN",
			transactionDate: "2021-09-20 10:00",
			description: "Business Loan",
			loanAmount: 25000,
			amount: 25000,
			currency: "USD",
		},
		{
			id: 24,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-09-20 10:00",
			description: "Transfer to Mom",
			amount: -300,
			currency: "USD",
		},
		{
			id: 25,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-10-01 15:00",
			amount: 150,
			currency: "EUR",
			targetCurrency: "USD",
			originalAmount: 150,
			exchangedAmount: 220,
		},
		{
			id: 26,
			transactionType: "INVESTMENT",
			transactionDate: "2021-10-01 15:00",
			currency: "USD",
			amount: 700,
			stockName: "FB",
		},
		{
			id: 27,
			transactionType: "LOAN",
			transactionDate: "2021-10-01 15:00",
			description: "Vacation Loan",
			loanAmount: 3000,
			amount: 3000,
			currency: "USD",
		},
		{
			id: 28,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2021-10-01 15:00",
			description: "Payment for Services",
			amount: -450,
			currency: "USD",
		},
		{
			id: 29,
			transactionType: "CURRENCY_EXCHANGE",
			transactionDate: "2021-10-10 09:30",
			amount: 250,
			currency: "PLN",
			targetCurrency: "USD",
			originalAmount: 250,
			exchangedAmount: 2.25,
		},
		{
			id: 30,
			transactionType: "INVESTMENT",
			transactionDate: "2021-10-10 09:30",
			currency: "USD",
			amount: 1500,
			stockName: "NVDA",
		},
		{
			id: 31,
			transactionType: "LOAN",
			transactionDate: "2022-01-15 09:30",
			description: "Personal Loan",
			loanAmount: 30000,
			amount: 30000,
			currency: "USD",
		},
		{
			id: 32,
			transactionType: "MONEY_TRANSFER",
			transactionDate: "2022-02-20 14:45",
			description: "Consulting Fee",
			amount: -500,
			currency: "USD",
		},
	],
];

// Define the filter options as constants.
const filterOptions = ["all", "income", "charge", "trade"];

interface HistoryWidgetProps {
	userId: number;
}

// Define the HistoryWidget component.
const HistoryWidget: React.FC<HistoryWidgetProps> = ({ userId }: HistoryWidgetProps) => {
	const [filter, setFilter] = useState<string>("all");
	//   const [data, setData] = useState<HistoryDataElement[]>([]);

	// Fetch data from the API when the component mounts.
	//   useEffect(() => {
	//     const fetchData = async () => {
	//       const result = await axios.get("http://localhost:5000/history");
	//       setData(result.data);
	//     };
	//     fetchData();
	//   }, []);

	const filteredData = data[userId - 1].filter((item) => {
		if (filter === "all") return true;
		if (filter === "income") {
			return item.transactionType === "LOAN" || (item.transactionType === "MONEY_TRANSFER" && item.amount > 0);
		}
		if (filter === "charge") {
			return item.transactionType === "MONEY_TRANSFER" && item.amount < 0;
		}
		if (filter === "trade") {
			return item.transactionType === "CURRENCY_EXCHANGE" || item.transactionType === "INVESTMENT";
		}
		return false;
	});
	return (
		<WidgetContainer width={"30rem"} height={"auto"} bgColor="#fbfbfe">
			<Box css={historyHeaderStyle}>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					Transaction History
				</Typography>
			</Box>
			<Box css={historyButtonsStyle}>
				{filterOptions.map((option) => (
					<Button
						key={option}
						onClick={() => setFilter(option)}
						sx={{
							border: "1px solid #FFD700",
							borderRadius: "2rem",
							padding: "0.5rem 1rem 0.5rem 1rem",
							backgroundColor: filter === option ? "#FFD700" : "transparent",
							color: filter === option ? "black" : "white",
							"&:hover": {
								backgroundColor: "#FFD700",
								color: "black",
							},
						}}
						style={{
							margin: "0 5px",
						}}
					>
						{option}
					</Button>
				))}
			</Box>
			<HistoryList data={filteredData.slice(0, 3)} />
		</WidgetContainer>
	);
};

export default HistoryWidget;
