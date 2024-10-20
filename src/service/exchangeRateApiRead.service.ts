import { ExchangeRateApiReadResponse } from '@/model/exchangeRateApiReadResponse.type';
import axios from 'axios';

// Define the API base URL and key
const API_KEY = '708a025387324ee6352b3a33';  // Replace with your actual API Key
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

/**
 * Fetch the latest exchange rates for the given base currency.
 * @param baseCurrency - The base currency code (e.g., "USD", "EUR").
 * @returns The exchange rates for all currencies relative to the base currency.
 */
export const getExchangeRates = async (baseCurrency: string): Promise<ExchangeRateApiReadResponse> => {
    try {
      const response = await axios.get<ExchangeRateApiReadResponse>(
        `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
      );
  
      // Check if the API returned a successful response
      if (response.data.result === 'success') {
        return response.data;
      } else {
        throw new Error('Failed to retrieve exchange rates');
      }
    } catch (error) {
        throw new Error('Failed to retrieve exchange rates');
    }
  };
  
  /**
   * Get the exchange rate between two currencies.
   * @param fromCurrency - The currency to convert from (e.g., "USD").
   * @param toCurrency - The currency to convert to (e.g., "EUR").
   * @returns The exchange rate from the first currency to the second.
   */
  export const getExchangeRateBetweenCurrencies = async (fromCurrency: string, toCurrency: string): Promise<number | null> => {
    try {
      // Fetch exchange rates using the base currency
      const rates = await getExchangeRates(fromCurrency);
      
      // Get the exchange rate for the target currency
      const exchangeRate = rates.conversion_rates[toCurrency];
  
      // Check if the exchange rate exists
      if (exchangeRate) {
        return exchangeRate;
      } else {
        return 4.0;
      }
    } catch (error) {
      return 4.0;  // Return null if there's an error
    }
  };