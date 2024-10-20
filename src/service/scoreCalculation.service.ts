
// Define the map to hold currency pairs and their scores
// Hardcoded Map with scores for currency pairs and their reverse pairs
const currencyScores: Map<string, number> = new Map([
  // EUR pairs
  ["EUR/CHF", 75], ["CHF/EUR", 25],
  ["EUR/USD", 60], ["USD/EUR", 40],
  ["EUR/GBP", 50], ["GBP/EUR", 50],
  ["EUR/CNY", 45], ["CNY/EUR", 55],
  ["EUR/AUD", 70], ["AUD/EUR", 30],
  ["EUR/JPY", 55], ["JPY/EUR", 45],
  ["EUR/PLN", 65], ["PLN/EUR", 35],

  // CHF pairs
  ["CHF/USD", 80], ["USD/CHF", 20],
  ["CHF/GBP", 65], ["GBP/CHF", 35],
  ["CHF/CNY", 50], ["CNY/CHF", 50],
  ["CHF/AUD", 60], ["AUD/CHF", 40],
  ["CHF/JPY", 70], ["JPY/CHF", 30],
  ["CHF/PLN", 55], ["PLN/CHF", 45],

  // USD pairs
  ["USD/GBP", 40], ["GBP/USD", 60],
  ["USD/CNY", 30], ["CNY/USD", 70],
  ["USD/AUD", 75], ["AUD/USD", 25],
  ["USD/JPY", 65], ["JPY/USD", 35],
  ["USD/PLN", 50], ["PLN/USD", 50],

  // GBP pairs
  ["GBP/CNY", 85], ["CNY/GBP", 15],
  ["GBP/AUD", 60], ["AUD/GBP", 40],
  ["GBP/JPY", 55], ["JPY/GBP", 45],
  ["GBP/PLN", 70], ["PLN/GBP", 30],

  // CNY pairs
  ["CNY/AUD", 45], ["AUD/CNY", 55],
  ["CNY/JPY", 50], ["JPY/CNY", 50],
  ["CNY/PLN", 80], ["PLN/CNY", 20],

  // AUD pairs
  ["AUD/JPY", 75], ["JPY/AUD", 25],
  ["AUD/PLN", 65], ["PLN/AUD", 35],

  // JPY/PLN pair
  ["JPY/PLN", 60], ["PLN/JPY", 40],
]);


const currencyRatesRecentChanges: Map<string, number> = new Map([
  ["EUR/CHF", 3.45],  // Score is 75, so a positive change between 0.01 and 5.00
  ["CHF/EUR", -3.45], // Reverse pair with a negative value

  ["EUR/USD", 2.50],  // Score is 60
  ["USD/EUR", -2.50],

  ["EUR/GBP", 0],     // Score is 50, no change
  ["GBP/EUR", 0],

  ["EUR/CNY", -1.80], // Score is 45, so a negative change between -0.01 and -5.00
  ["CNY/EUR", 1.80],  // Reverse pair with a positive value

  ["EUR/AUD", 4.25],  // Score is 70
  ["AUD/EUR", -4.25],

  ["EUR/JPY", 1.35],  // Score is 55
  ["JPY/EUR", -1.35],

  ["EUR/PLN", 3.20],  // Score is 65
  ["PLN/EUR", -3.20],

  ["CHF/USD", 4.80],  // Score is 80
  ["USD/CHF", -4.80],

  ["CHF/GBP", 3.50],  // Score is 65
  ["GBP/CHF", -3.50],

  ["CHF/CNY", 0],     // Score is 50
  ["CNY/CHF", 0],

  ["CHF/AUD", 2.90],  // Score is 60
  ["AUD/CHF", -2.90],

  ["CHF/JPY", 3.85],  // Score is 70
  ["JPY/CHF", -3.85],

  ["CHF/PLN", 1.80],  // Score is 55
  ["PLN/CHF", -1.80],

  ["USD/GBP", -2.00], // Score is 40, negative change
  ["GBP/USD", 2.00],  // Reverse pair positive

  ["USD/CNY", -3.50], // Score is 30, larger negative change
  ["CNY/USD", 3.50],

  ["USD/AUD", 4.50],  // Score is 75
  ["AUD/USD", -4.50],

  ["USD/JPY", 3.25],  // Score is 65
  ["JPY/USD", -3.25],

  ["USD/PLN", 0],     // Score is 50, no change
  ["PLN/USD", 0],

  ["GBP/CNY", 4.90],  // Score is 85
  ["CNY/GBP", -4.90],

  ["GBP/AUD", 3.20],  // Score is 60
  ["AUD/GBP", -3.20],

  ["GBP/JPY", 2.25],  // Score is 55
  ["JPY/GBP", -2.25],

  ["GBP/PLN", 4.15],  // Score is 70
  ["PLN/GBP", -4.15],

  ["CNY/AUD", -1.85], // Score is 45
  ["AUD/CNY", 1.85],

  ["CNY/JPY", 0],     // Score is 50, no change
  ["JPY/CNY", 0],

  ["CNY/PLN", 4.80],  // Score is 80
  ["PLN/CNY", -4.80],

  ["AUD/JPY", 4.20],  // Score is 75
  ["JPY/AUD", -4.20],

  ["AUD/PLN", 3.60],  // Score is 65
  ["PLN/AUD", -3.60],

  ["JPY/PLN", 2.90],  // Score is 60
  ["PLN/JPY", -2.90],
]);


/**
 * Function to get the score for a given pair of currencies.
 * @param currency1 - The first currency (e.g., "USD").
 * @param currency2 - The second currency (e.g., "PLN").
 * @returns The score for the currency pair.
 */
export const getCurrencyPairScore = (currency1: string, currency2: string): number | undefined => {
  const pairKey = `${currency1}/${currency2}`;  // Construct the key for the map
  return currencyScores.get(pairKey);  // Get the score from the map
};

/**
 * Function to get the recent changes in exchange rates for a given pair of currencies.
 * @param currency1 - The first currency (e.g., "USD").
 * @param currency2 - The second currency (e.g., "PLN").
 * @returns The score for the currency pair.
 */
export const getCurrencyPairRateRecentChanges = (currency1: string, currency2: string): number | undefined => {
  const pairKey = `${currency1}/${currency2}`;  // Construct the key for the map
  return currencyRatesRecentChanges.get(pairKey);  // Get the recent changes from the map
};