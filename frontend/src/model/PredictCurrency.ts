export type PredictCurrency = {
    actual: {
        dates: string[];
        values: number[];
    },
    predicted: {
        dates: string[];
        values: number[];
    },
    future: {
        dates: string[];
        values: number[];
    }
}