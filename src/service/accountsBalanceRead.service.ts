import { Account } from "@/model/account.type";

const accounts: Account[] = [
    { currency: "USD", iban: "US12345678901234567890", balance: 11000.50 },
    { currency: "EUR", iban: "DE12345678901234567890", balance: 22500.75 },
    { currency: "GBP", iban: "GB12345678901234567890", balance: 31500.00 },
    { currency: "PLN", iban: "PL12345678901234567890", balance: 43000.00 },
    { currency: "AUD", iban: "AU12345678901234567890", balance: 5800.00 },
    { currency: "CAD", iban: "CA12345678901234567890", balance: 61200.30 },
    { currency: "CHF", iban: "CH12345678901234567890", balance: 7950.25 },
    { currency: "JPY", iban: "JP12345678901234567890", balance: 870000.00 },
    { currency: "CNY", iban: "CN12345678901234567890", balance: 94500.45 },
    { currency: "NZD", iban: "NZ12345678901234567890", balance: 101300.80 },
    { currency: "SGD", iban: "SG12345678901234567890", balance: 112000.00 },
    { currency: "HKD", iban: "HK12345678901234567890", balance: 123000.00 },
    { currency: "NOK", iban: "NO12345678901234567890", balance: 131800.25 },
    { currency: "ZAR", iban: "ZA12345678901234567890", balance: 142500.50 },
    { currency: "SEK", iban: "SE12345678901234567890", balance: 151700.00 },
    { currency: "RUB", iban: "RU12345678901234567890", balance: 1612000.50 },
    { currency: "INR", iban: "IN12345678901234567890", balance: 178500.30 },
    { currency: "MXN", iban: "MX12345678901234567890", balance: 184000.75 },
    { currency: "BRL", iban: "BR12345678901234567890", balance: 193300.60 },
    { currency: "AED", iban: "AE12345678901234567890", balance: 20900.90 },
  ];

  // Function to get all accounts (just returns the accounts array)
export const getAllAccounts = (): Account[] => {
    return accounts;
  }