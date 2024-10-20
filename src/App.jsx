import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stocks from './Stocks/stock';
import ChooseStocks from './Stocks/ChooseStocks';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Stocks />} />
                <Route path="/choose-stocks" element={<ChooseStocks />} />
            </Routes>
        </Router>
    );
}

export default App;