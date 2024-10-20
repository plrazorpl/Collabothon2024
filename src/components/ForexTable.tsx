import React, { useState } from "react";

interface CurrencyData {
  currency: string;
  currentRate: number;
  highestLastWeek: number;
  highestLastMonth: number;
  lowestLastWeek: number;
  lowestLastMonth: number;
}

const data: CurrencyData[] = [
  {
    currency: "USD",
    currentRate: 1.12, // Umiarkowany wzrost
    highestLastWeek: 1.11,
    highestLastMonth: 1.18,
    lowestLastWeek: 1.1,
    lowestLastMonth: 1.05,
  },
  {
    currency: "CHF", // Frank szwajcarski
    currentRate: 0.88,
    highestLastWeek: 0.9,
    highestLastMonth: 0.95,
    lowestLastWeek: 0.87,
    lowestLastMonth: 0.85,
  },
  {
    currency: "GBP", // Funt brytyjski
    currentRate: 0.79, // Stabilny spadek
    highestLastWeek: 0.81,
    highestLastMonth: 0.78,
    lowestLastWeek: 0.78,
    lowestLastMonth: 0.76,
  },
  {
    currency: "CNY", // Yuan chiński
    currentRate: 6.85, // Zmniejszenie wartości
    highestLastWeek: 6.81,
    highestLastMonth: 7.05,
    lowestLastWeek: 6.8,
    lowestLastMonth: 6.7,
  },
  {
    currency: "AUD", // Dolar australijski
    currentRate: 1.45, // Wyższy kurs
    highestLastWeek: 1.48,
    highestLastMonth: 1.5,
    lowestLastWeek: 1.43,
    lowestLastMonth: 1.4,
  },
  {
    currency: "JPY", // Jen japoński
    currentRate: 129.5, // Stabilny kurs
    highestLastWeek: 130.0,
    highestLastMonth: 128.0,
    lowestLastWeek: 128.5,
    lowestLastMonth: 127.0,
  },
  {
    currency: "PLN", // Złoty polski
    currentRate: 4.65, // Umiarkowany wzrost
    highestLastWeek: 4.68,
    highestLastMonth: 4.75,
    lowestLastWeek: 4.6,
    lowestLastMonth: 4.5,
  },
  {
    currency: "CAD", // Dolar kanadyjski
    currentRate: 1.35, // Utrata wartości
    highestLastWeek: 1.38,
    highestLastMonth: 1.4,
    lowestLastWeek: 1.3,
    lowestLastMonth: 1.25,
  },
  {
    currency: "NZD", // Dolar nowozelandzki
    currentRate: 1.48, // Stabilny wzrost
    highestLastWeek: 1.5,
    highestLastMonth: 1.52,
    lowestLastWeek: 1.45,
    lowestLastMonth: 1.42,
  },
  {
    currency: "SEK", // Korona szwedzka
    currentRate: 9.15, // Stabilny spadek
    highestLastWeek: 9.2,
    highestLastMonth: 9.25,
    lowestLastWeek: 9.1,
    lowestLastMonth: 9.0,
  },
];

const getColorForRate = (
  currentRate: number,
  highestLastWeek: number,
  highestLastMonth: number
) => {
  console.log(currentRate, highestLastWeek, highestLastMonth);
  console.log(
    `currentRate${currentRate}`,
    `highestLastWeek${highestLastWeek}`,
    `highestLastMonth${highestLastMonth}`
  );
  console.log("currentRate > highestLastMonth", currentRate > highestLastMonth);
  console.log("currentRate > highestLastWeek", currentRate > highestLastWeek);
  if (currentRate > highestLastMonth) return "bg-green-500";
  if (currentRate > highestLastWeek) return "bg-yellow-500";
  return "bg-red-500";
};

const ForexTable: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (currency: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(currency)
        ? prevFavorites.filter((fav) => fav !== currency)
        : [...prevFavorites, currency]
    );
  };

  return (
    <div className="bg-white  max-w-4xl overflow-x-auto m-5">
      <h2 className="text-2xl font-semibold mb-4">Forex Rates to EUR</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left w-1/12">Favorite</th>
            <th className="px-4 py-2 text-left w-1/6">Currency</th>
            <th className="px-4 py-2 text-left w-1/6">Current Rate</th>
            <th className="px-4 py-2 text-left w-1/6">Highest (Last Week)</th>
            <th className="px-4 py-2 text-left w-1/6">Highest (Last Month)</th>
            <th className="px-4 py-2 text-left w-1/6">Lowest (Last Week)</th>
            <th className="px-4 py-2 text-left w-1/6">Lowest (Last Month)</th>
            <th className="px-4 py-2 text-left w-1/12">Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((currency) => {
            const isFavorite = favorites.includes(currency.currency);
            const trendColor = getColorForRate(
              currency.currentRate,
              currency.highestLastWeek,
              currency.highestLastMonth
            );

            return (
              <tr key={currency.currency} className="border-b">
                <td className="px-4 py-2">
                  <button onClick={() => toggleFavorite(currency.currency)}>
                    {isFavorite ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gold"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.998 2.75l2.487 6.603 7.015.594-5.103 4.415 1.507 6.886-6.506-3.767-6.506 3.767 1.507-6.886L2.498 9.947l7.015-.594 2.485-6.603z"
                        />
                      </svg>
                    )}
                  </button>
                </td>
                <td className="px-4 py-2">{currency.currency}</td>
                <td className="px-4 py-2">{currency.currentRate.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {currency.highestLastWeek.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  {currency.highestLastMonth.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  {currency.lowestLastWeek.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  {currency.lowestLastMonth.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`w-4 h-4 rounded-full inline-block ${trendColor}`}
                  ></span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForexTable;
