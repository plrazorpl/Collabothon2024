import React from "react";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "../components/Button/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IAccount } from "../hooks/useFetchAccounts";
interface AccountCardProps {
	userAccount: IAccount | undefined;
}

const generateAccountNumber = (length: number = 10): string => {
  let accountNumber = "";
  for (let i = 0; i < length; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }
  return accountNumber;
};

// export const generateMockAccounts = (count: number): AccountCardProps[] => {
//   const accountTypes = ["Savings", "Checking", "Business", "Joint"];
//   const mockAccounts: AccountCardProps[] = [];

//   for (let i = 0; i < count; i++) {
//     const accountType = accountTypes[Math.floor(Math.random() * accountTypes.length)];
//     const accountNumber = generateAccountNumber();
//     const balance = parseFloat((Math.random() * 10000).toFixed(2));

//     mockAccounts.push({ accountType, accountNumber, balance });
//   }

//   return mockAccounts;
// };

// const AccountWidget: React.FC<AccountCardProps> = ({ accountType, accountNumber, balance }: AccountCardProps) => {
const AccountWidget: React.FC<AccountCardProps> = ({ userAccount: account }: AccountCardProps) => {

  if (!account) {
    return null;
  }
  // const client = account as Client
  // const { accountType, accountNumber, balance } = generateMockAccounts(1)[0];
  const firstDigit = account.bban.slice(0, 2);
  const lastDigit1 = account.bban.slice(-4);
  const lastDigit2 = account.bban.slice(-8, -4);

	return (
		<Card
			sx={{
				width: "30rem",
				height: 180,
				padding: 2,
				backgroundColor: "#002E3C",
				color: "white",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				borderRadius: "1rem",
			}}
		>
			<CardContent>
				<Typography variant="h6" component="div" sx={{ position: "absolute", top: 12, left: 20 }}>
  					{account.client.type === 'naturalPerson' ? 'Personal Account' : 'Business Account'} 
				</Typography>

				<Typography variant="body2" component="div" sx={{ position: "absolute", top: 45, left: 20 }}>
					{firstDigit} (...) {lastDigit1} {lastDigit2}
				</Typography>

				<Typography variant="h6" component="div" sx={{ textAlign: "right", marginTop: "10px" }}>
					Balance
				</Typography>
				<Typography variant="h4" component="div" sx={{ textAlign: "right" }}>
					${account.balanceAmount.toFixed(2)}
				</Typography>
			</CardContent>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Button
					bgColor={"none"}
					txtColor={"#FFD700"}
					bgHover={"#01394a"}
					startIcon={<HistoryIcon />}
					hoverAnimation={true}
					variant="outlined"
				>
					HISTORY
				</Button>
				<Button
					bgColor={"#FFD700"}
					txtColor={"black"}
					bgHover={"#ffc400"}
					startIcon={<TransferIcon />}
					hoverAnimation={true}
				>
					TRANSFER
				</Button>
			</div>
		</Card>
	);
};

export default AccountWidget;
