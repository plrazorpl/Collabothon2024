import './App.css'
import CurrencyPieChartWidget from "./components/CurrencyPieChartWidget/CurrencyPieChartWidget.tsx";
import TransactionsWidget from "./components/TransactionsWidget/TransactionsWidget.tsx";
import TimeSpentWidget from "./components/TimeSpentWidget/TimeSpentWidget.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import './i18n';
import PredictCurrencyLineChart from "./components/PredictCurrencyChartWidget/PredictCurrencyLineChart.tsx";

function App() {

    return (
        <ThemeProvider>
            <>
                <div className={'w-full min-h-screen sm:h-full bg-bgColor text-textColor pb-6'}>
                    <Navbar/>
                    <div className={'grid lg:grid-cols-2 sm:grid-cols-1 mb-6 mx-6 mt-8 lg:mt-16 lg:mx-16 sm:mt-4 sm:mx-4 gap-8'}>
                        <div className={'max-h-[40rem] card-shadow card-animation flex flex-col h-full border-2 border-textColor rounded-xl'}>
                            <CurrencyPieChartWidget />
                        </div>
                        <div className={'max-h-[40rem] card-shadow card-animation flex flex-col h-full border-2 border-textColor rounded-xl'}>
                            <PredictCurrencyLineChart/>
                        </div>
                        <div className={'card-shadow card-animation flex flex-col h-full border-2 border-textColor rounded-xl'}>
                            <TransactionsWidget />
                        </div>
                        <div className={'card-shadow card-animation flex flex-col h-full border-2 border-textColor rounded-xl'}>
                            <TimeSpentWidget />
                        </div>
                    </div>
                </div>
            </>
        </ThemeProvider>
  )
}

export default App
