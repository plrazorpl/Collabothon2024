import React, { useState, useEffect } from 'react';
import './stock.css';

export default function Stocks() {
    const [favorites, setFavorites] = useState([]);
    const [detailedData, setDetailedData] = useState(null);
    const [isChoosingStocks, setIsChoosingStocks] = useState(false); // State for choosing stocks
    const [availableStocks, setAvailableStocks] = useState([]);
    const [selectedDate, setSelectedDate] = useState('2023-01-09');
    const [error, setError] = useState('');
    const key = "JFAIpJfVVFHFr7iRKPmoiDwYSruY6KP3";

    // Function to fetch available stocks
    const handleViewStocks = async () => {
        const url = `https://api.polygon.io/v3/reference/tickers?active=true&limit=30&apiKey=${key}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            setAvailableStocks(result.results);
        } catch (error) {
            setError('Error fetching stock list');
            console.error(error);
        }
    };

    // Add or remove stocks from favorites
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

    // Save favorite stocks to the database
    const sendFavoritesToDatabase = async () => {
        try {
            await fetch('/api/save-favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favorites }),
            });
        } catch (error) {
            setError('Error saving data to the database');
            console.error(error);
        }
    };

    // Fetch stock data for a specific ticker
    const handleFetchStockData = async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${selectedDate}/${selectedDate}?apiKey=${key}`;
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
                setError(`No data found for the selected date (${selectedDate}).`);
                setDetailedData(null);
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching stock data');
        }
    };

    return (
        <div className="container">
            {/* If the user is choosing stocks */}
            {isChoosingStocks ? (
                <>
                    <button onClick={() => setIsChoosingStocks(false)}>Return to Favorites</button>
                    <button onClick={handleViewStocks}>Load Stocks</button>
                    <div className="date-selector">
                        <label htmlFor="date">Select Date: </label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <h2>Available Stocks</h2>
                    {availableStocks.length > 0 ? (
                        <ul className="stock-list">
                            {availableStocks.map((stock, index) => (
                                <li key={index}>
                                    <div>Ticker: {stock.ticker}</div>
                                    <div>Name: {stock.name}</div>
                                    <button onClick={() => handleToggleFavorite(stock.ticker)}>
                                        {favorites.includes(stock.ticker) ? "Remove from Favorites" : "Add to Favorites"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No available stocks.</div>
                    )}
                    <button onClick={sendFavoritesToDatabase}>Save Favorite Stocks</button>
                </>
            ) : (
                // Favorites page
                <>
                    <h1>Your Favorite Stocks</h1>
                    {favorites.length === 0 ? (
                        <div>You have no favorite stocks.</div>
                    ) : (
                        <div>
                            {favorites.map((ticker, index) => (
                                <div key={index} className="stock-item">
                                    <div>Ticker: {ticker}</div>
                                    <button onClick={() => handleFetchStockData(ticker)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>You have selected {favorites.length} out of 5 stocks.</div>

                    <button onClick={() => setIsChoosingStocks(true)}>Choose Stocks</button>

                    <div className="stock-details">
                        {detailedData ? (
                            <div>
                                <h2>Stock Details:</h2>
                                <p>Open: {detailedData.o}</p>
                                <p>Close: {detailedData.c}</p>
                                <p>High: {detailedData.h}</p>
                                <p>Low: {detailedData.l}</p>
                                <p>Date: {new Date(detailedData.t).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <div>
                                <h2>Select a stock to view details</h2>
                            </div>
                        )}
                    </div>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </>
            )}
        </div>
    );
}