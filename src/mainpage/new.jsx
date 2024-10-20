import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './new.css';

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

export default function Stocks() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [detailedData, setDetailedData] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        loadStocks();
    }, []);

    const loadStocks = async () => {
        const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/prev?apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error loading stock data');
            }
            const result = await response.json();
            setStocks(result.results);
        } catch (error) {
            console.error(error);
            setError('Error fetching stock data');
        }
    };

    const handleFetchStockData = async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${apiKey}`;
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

    return (
        <div className="container">
            <h1>Welcome to the Stock Widget</h1>
            <div className="widget">
                <h2>Your Favorite Stocks</h2>
                {favorites.length === 0 ? (
                    <div>You have no favorite stocks.</div>
                ) : (
                    <div>
                        {favorites.map((ticker, index) => (
                            <div key={index} className="stock-item">
                                <div className="stock-ticker">{ticker}</div>
                                <button className="view-details-button" onClick={() => handleFetchStockData(ticker)}>View Details</button>
                            </div>
                        ))}
                    </div>
                )}
                <div>You have selected {favorites.length} out of 5 stocks.</div>
                <button className="choose-stocks-button" onClick={() => navigate('/choose-stocks')}>Choose Stocks</button>
                <StockDetails detailedData={detailedData} />
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}