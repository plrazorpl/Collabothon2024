import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Approvals from '@components/approvals/Approvals';
import BalanceDashboard from '@components/balanceDashboard/balanceDashboard';
import ExchangeRates from '@components/exchangeRates/exchangeRates';
import Kittens from '@components/Kittens/Kittens';
import DefaultLayout from '@components/layout/DefaultLayout';
import NewFeaturesWidget from '@components/NewFeaturesWidget/NewFeaturesWidget';
import QuickAccess from '@components/QuickAccess/QuickAccess';
import { theme } from '@plugins/antDesign';

import './App.css';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/approvals"
            element={
              <div className="w-full h-full bg-black flex justify-center items-center">
                <Approvals />
              </div>
            }
          />
          <Route
            path="/quick-access"
            element={
              <div className="w-full h-full bg-black flex justify-center items-center">
                <QuickAccess />
              </div>
            }
          />
          <Route
            path="/kittens"
            element={
              <div className="w-full h-full bg-black flex justify-center items-center">
                <Kittens />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="App">
                <DefaultLayout>
                  <Approvals />
                  <QuickAccess />
                  <NewFeaturesWidget />
                  <BalanceDashboard />
                  <ExchangeRates />
                  <Kittens />
                </DefaultLayout>
              </div>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
