import { useCallback, useState } from "react";
import { Header } from "./components/Header/Header";
import { RecommendedProducts } from "./widgets/RecommendedProducts/RecommendedProducts";
import { Chatbot } from "./widgets/Chatbot/Chatbot";
import StockWidget from "./widgets/StockWidget";
import { Loading } from "./components/Loading/Loading";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { Box, Grow } from "@mui/material";
import { FloatingActionButton } from "./components/FloatingActionButton/FloatingActionButton";
import TextsmsIcon from "@mui/icons-material/Textsms";
import HistoryWidget from "./widgets/HistoryWidget/HistoryWidget";
import AccountWidget from "./widgets/AccountWidg";
import { useFetchAccounts } from "../src/hooks/useFetchAccounts";
import { TransitionGroup } from "react-transition-group";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function App() {
  const [userId, setUserId] = useState(1);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const handleChangeAccount = useCallback((accountId: number) => setUserId(accountId), []);
  const { data, isLoading, isFetched } = useFetchProducts(true, userId);
  const { data: userAccounts } = useFetchAccounts();

	const toggleChatbot = () => {
		setIsChatbotVisible((prev) => !prev);
	};

	if (isLoading || !isFetched) {
		return <Loading />;
	}

	return (
		<div className="container">
			<Header onChangeAccount={handleChangeAccount} data={userAccounts} />
			<div className="page">
				<div className="one">
					<AccountWidget
						userAccount={userAccounts ? userAccounts.find((element) => element.id === userId) : undefined}
					/>
				</div>
				<div className="two">
				<HistoryWidget userId={userId} />

					<StockWidget userId={userId} />
				</div>
				<div className="three">
					<Box position="relative" width="30rem">
						<RecommendedProducts data={data} />
						<FloatingActionButton onClick={toggleChatbot}>
							<TextsmsIcon />
						</FloatingActionButton>
					</Box>
          <TransitionGroup>
          {isChatbotVisible && (
            <Grow in={isChatbotVisible} timeout={300}>
              <div
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  zIndex: 100,
                }}
              >
                <Chatbot data={data} isChatbotVisible={isChatbotVisible} />
              </div>
            </Grow>
          )}
        </TransitionGroup>
				</div>
			</div>
      <Footer />
		</div>
	);
}

export default App;
