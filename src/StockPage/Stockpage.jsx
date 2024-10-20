import React, { useState, useEffect } from 'react';

// Ваш API ключ
const apiKey = "JFAIpJfVVFHFr7iRKPmoiDwYSruY6KP3";
// URL для получения активных акций
const successfulStocksUrl = `https://api.polygon.io/v3/reference/tickers?apiKey=${apiKey}`;

export default function StockPage() {
    const [stocks, setStocks] = useState([]);
    const [stockData, setStockData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });

    // Эффект для получения списка активных акций
    useEffect(() => {
        fetchSuccessfulStocks();
    }, []);

    const fetchSuccessfulStocks = async () => {
        try {
            const response = await fetch(successfulStocksUrl);
            if (!response.ok) {
                throw new Error('Ошибка загрузки списка акций');
            }
            const data = await response.json();
            setStocks(data.results); // Устанавливаем массив акций
        } catch (error) {
            console.error(error);
        }
    };

    // Функция для получения данных по конкретной акции
    const handleFetchStockData = async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${selectedDate}/${selectedDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных о компании');
            }
            const data = await response.json();

            // Проверка на наличие результатов
            if (data.results && data.results.length > 0) {
                setStockData(data.results[0]); // Сохраняем только первую запись
            } else {
                setStockData(null); // Очистка состояния если данных нет
            }
        } catch (error) {
            console.error(error);
            setStockData(null);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div>
            <h1>Популярные Акции</h1>
            <label>
                Выберите дату:
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </label>
            <ul>
                {stocks.map((stock, index) => (
                    <li key={index}>
                        {stock.name} ({stock.ticker})
                        <button onClick={() => handleFetchStockData(stock.ticker)}>Подробнее</button>
                    </li>
                ))}
            </ul>
            {stockData ? (
                <div className="stock-details">
                    <h2>Детали акции {stockData.ticker}:</h2>
                    <p>Открытие: {stockData.o}</p>
                    <p>Закрытие: {stockData.c}</p>
                    <p>Максимум: {stockData.h}</p>
                    <p>Минимум: {stockData.l}</p>
                    <p>Дата: {new Date(stockData.t).toLocaleDateString()}</p>
                </div>
            ) : (
                <div>
                    <h2>Данные по всем успешным акциям на {selectedDate}</h2>
                </div>
            )}
        </div>
    );
}
