export type CurrencyBalance = {
        currency: string;
        percent: number;
        amount: number;
        realValueInEur: number;
}

export type CurrencyData = {
    balances: Array<CurrencyBalance>,
    totalBalance: number
};