import {TimeSpent} from "../model/TimeSpent.ts";
import axios from "axios";
import {Transactions} from "../model/Transactions.ts";

export class TransactionsAPI {

    static getTransactionsData(customerId: number): Promise<TimeSpent> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/transactions/analyze/${customerId}`)
            .then((response) => response.data);
    }

    static async MOCKgetTransactionsData(): Promise<Transactions> {
        return {
            cashTransactions: 20,
            onlineTransactions: 42,
            carbonFootprint: 17,
        };
    }
}