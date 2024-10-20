import React, { useState, useEffect } from 'react';
import './ExchangeRateWidget.css'; // Подключаем стили для виджета


const apiKey = "11731abbb0d86cdcdf174592";
const baseCurrency = "USD"; // Базовая валюта
const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

export default function ExchangeRateWidget() {
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('PLN'); // По умолчанию злотый
    const [availableCurrencies] = useState(['PLN', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'CNY', 'SEK', 'NZD']); // Доступные валюты

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(exchangeRateUrl);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке курсов валют');
                }
                const data = await response.json();
                setExchangeRates(data.conversion_rates); // Устанавливаем курсы валют
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="exchange-rate-widget">
            <h2>Exchange Rate of {baseCurrency} to {selectedCurrency}</h2>
            <p><h1>{selectedCurrency}: {exchangeRates[selectedCurrency]}</h1></p>

            <select onChange={(e) => setSelectedCurrency(e.target.value)} value={selectedCurrency}>
                {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
}
