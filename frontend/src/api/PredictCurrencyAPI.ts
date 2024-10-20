import {PredictCurrency} from "../model/PredictCurrency.ts";
import axios from "axios";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function formatDates(data: PredictCurrency): PredictCurrency {
    return {
        actual: {
            dates: data.actual.dates.map(formatDate),
            values: data.actual.values
        },
        predicted: {
            dates: data.predicted.dates.map(formatDate),
            values: data.predicted.values
        },
        future: {
            dates: data.future.dates.map(formatDate),
            values: data.future.values
        }
    };
}

export class PredictCurrencyAPI {

    static getPredictCurrency(customerId: number): Promise<PredictCurrency> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/currency/${customerId}`)
            .then((response) => formatDates(response.data));
    }

    static async MOCKgetPredictCurrency(): Promise<PredictCurrency> {
        return {
            actual: {
                dates: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
                values: [1.1, 5.4, 3.3, 6.4, 2.5]
            },
            predicted: {
                dates: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
                values: [1.6, 1.7, 1.8, 1.9, 2.0]
            },
            future: {
                dates: ['2021-01-06', '2021-01-07', '2021-01-08', '2021-01-09', '2021-01-10'],
                values: [2.1, 2.2, 2.3, 2.4, 2.5]
            }
        }
    }
}