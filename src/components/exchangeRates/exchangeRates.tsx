import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './ExchangeRates.scss';

interface ExchangeRateData {
  date: string;
  rate: number;
}

const ExchangeRates: React.FC = () => {
  // Currency options
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  // Currency symbols
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
  };

  // State variables
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');

  // Mock data generation for exchange rates
  const getMockData = (from: string, to: string): ExchangeRateData[] => {
    const data: ExchangeRateData[] = [];
    const baseRate = getMockExchangeRate(from, to);

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      // Generate a mock exchange rate with minimal fluctuations
      const fluctuation = Math.sin(i / 5) * 0.005; // Smoother fluctuations
      const rate = baseRate + fluctuation;
      data.push({ date: dateString, rate: parseFloat(rate.toFixed(4)) });
    }
    return data;
  };

  // Mock function to get exchange rate
const getMockExchangeRate = (from: string, to: string): number => {
  const baseRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.9,
    GBP: 0.8,
    JPY: 110.0,
    AUD: 1.4,
    CAD: 1.3,
  };
  const fromRate = baseRates[from];
  const toRate = baseRates[to];
  const exchangeRate = toRate / fromRate;
  return exchangeRate;
};

// Function to get the exchange rate with fluctuation
const getExchangeRateWithFluctuation = (from: string, to: string): JSX.Element => {
  const baseRate = getMockExchangeRate(from, to);
  const fluctuation = Math.random() * 0.1 - 0.05; // Random fluctuation between -0.05 and 0.05
  const finalRate = baseRate + fluctuation;
  return <span style={{ fontWeight: 'bold' }}>{finalRate.toFixed(2)}</span>;
};

  // Handle currency selection change
  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  // Get the data for the selected currency pair
  const chartData = getMockData(fromCurrency, toCurrency);

  // Get the latest rate
  const latestRate = chartData[chartData.length - 1]?.rate || 0;

  return (
    <div className="exchangeRates-widget">
      <div className="exchangeRates-widget__header">
        <div className="exchangeRates-widget__selector">
          <select
            className="balanceDashboard__controls__select"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {currencies.map((currency) => (
              <option value={currency} key={`from-${currency}`}>
                {currency}
              </option>
            ))}
          </select>
          <span className="exchangeRates-widget__separator">/</span>
          <select
            className="balanceDashboard__controls__select"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            {currencies.map((currency) => (
              <option value={currency} key={`to-${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="exchangeRates-widget__rate">
          <span style={{ fontWeight: 'bold' }}>{currencySymbols[toCurrency]}{latestRate.toFixed(4)}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="exchangeRates-widget__chart">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34C759" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#34C759" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number) => [`${value.toFixed(4)}`, 'Rate']}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#34C759"
              fill="url(#colorRate)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExchangeRates;
