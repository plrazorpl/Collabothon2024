import axios from "axios";
import {TimeSpent} from "../model/TimeSpent.ts";


export class TimeSpentAPI {

    static getTimeSpentData(customerId: number): Promise<TimeSpent> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/duration/analyze/${customerId}`)
            .then((response) => response.data);
    }

    static async MOCKgetTimeSpentData(): Promise<TimeSpent> {
        return {
            averageCustomersTime: 20,
            customerAverageTime: 3.2,
            lastVisit: "2 minutes duration",
            trend: 2
        };
    }
}