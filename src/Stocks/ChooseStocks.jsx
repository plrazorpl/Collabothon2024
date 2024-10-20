import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stock.css';

const StockItem = ({ stock, handleToggleFavorite, isFavorite, handleFetchStockData }) => (
    <div className="stock-item">
        <p>{stock.ticker}</p>
        <button
            className={`mt-2 px-4 py-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
            onClick={() => handleToggleFavorite(stock.ticker)}
        >
            {isFavorite ? 'Remove' : 'Add'}
        </button>
        <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleFetchStockData(stock.ticker)}
        >
            View Details
        </button>
    </div>
);

const StockList = ({ stocks, handleToggleFavorite, favorites, handleFetchStockData }) => (
    <div className="grid">
        {stocks.map((stock, index) => (
            <StockItem
                key={index}
                stock={stock}
                handleToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(stock.ticker)}
                handleFetchStockData={handleFetchStockData}
            />
        ))}
    </div>
);

const StockDetails = ({ detailedData }) => {
    const calculateGrowth = (open, close) => {
        return ((close - open) / open * 100).toFixed(2);
    };

    return (
        detailedData ? (
            <div className="stock-details">
                <h2>Stock Details:</h2>
                <p>Open: {detailedData.o}</p>
                <p>Close: {detailedData.c}</p>
                <p>High: {detailedData.h}</p>
                <p>Low: {detailedData.l}</p>
                <p>Date: {new Date(detailedData.t).toLocaleDateString()}</p>
                <p>Growth: {calculateGrowth(detailedData.o, detailedData.c)}%</p>
            </div>
        ) : (
            <div>
                <h2>Select a stock to view details</h2>
            </div>
        )
    );
};

export default function ChooseStocks() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [availableStocks, setAvailableStocks] = useState([]);
    const [detailedData, setDetailedData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const key = "JFAIpJfVVFHFr7iRKPmoiDwYSruY6KP3";

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=30&apiKey=${key}`);
                const result = await response.json();
                setAvailableStocks(result.results);
            } catch (error) {
                setError('Error fetching stock list');
                console.error(error);
            }
        };
        fetchStocks();
    }, [key]);

    const handleToggleFavorite = (ticker) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(ticker)) {
                return prevFavorites.filter(fav => fav !== ticker);
            } else {
                if (prevFavorites.length < 5) {
                    return [...prevFavorites, ticker];
                } else {
                    alert("You can only select up to 5 stocks.");
                    return prevFavorites;
                }
            }
        });
    };

    const handleFetchStockData = async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${key}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error loading stock data');
            }
            const result = await response.json();
            if (result.results && result.results.length > 0) {
                setDetailedData(result.results[0]);
                setError('');
            } else {
                setError('No data found for the selected date.');
                setDetailedData(null);
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching stock data');
        }
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <div className="container mx-auto p-4 flex">
            <div className="left-panel">
                <button className="px-4 py-2 bg-gray-500 text-white rounded mb-8" onClick={() => navigate('/')}>
                    Back to Main Page
                </button>
                <h1 className="text-3xl font-bold mt-4">Choose Your Favorite Stocks</h1>
                <div className="date-selector mb-4">
                    <label htmlFor="date" className="mr-2">Select Date: </label>
                    <input type="date" id="date" value="2023-01-09" readOnly className="p-2 border rounded" />
                </div>
            </div>
            <div className="right-panel">
                <h2 className="text-2xl mt-2 mb-4">Available Stocks</h2>
                {availableStocks.length > 0 ? (
                    <StockList
                        stocks={availableStocks}
                        handleToggleFavorite={handleToggleFavorite}
                        favorites={favorites}
                        handleFetchStockData={handleFetchStockData}
                    />
                ) : (
                    <div>No available stocks.</div>
                )}
                {error && <div className="text-red-500 mt-4">{error}</div>}
                <StockDetails detailedData={detailedData} />
            </div>
        </div>
    );
}