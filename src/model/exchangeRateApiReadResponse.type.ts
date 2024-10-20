export type ExchangeRateApiReadResponse = {
    result: string;
    base_code: string;
    conversion_rates: {
      [currencyCode: string]: number;
    };
  };