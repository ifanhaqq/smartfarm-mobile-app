import { AxiosError, AxiosResponse } from "axios";
import axios from "../utils/axiosDev";

export class ReportService {

    async checkConnection() {
        try {
            const response: AxiosResponse<string> = await axios.get("/");
            console.log("Connected successfully", response.data, response.status);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getReport(monthsPrior: number) {
        try {
            const response: AxiosResponse<any> = await axios.post<any>("/neraca", {
                month: monthsPrior
            });

            return response.data;
        } catch (error) {
            throw error;
          }
        // return data;
    }
}