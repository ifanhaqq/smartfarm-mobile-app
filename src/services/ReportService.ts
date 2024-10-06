import { AxiosError, AxiosResponse } from "axios";
import axios from "../utils/axios";

export class ReportService {

    private serviceUrl = "http://192.168.20.99:3000";

    async checkConnection() {
        try {
            const response: AxiosResponse<string> = await axios(this.serviceUrl).get("/");
            console.log("Connected successfully", response.data, response.status);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getReport(monthsPrior: number) {
        try {
            const response: AxiosResponse<any> = await axios(this.serviceUrl).post<any>("/neraca", {
                month: monthsPrior
            });

            return response.data;
        } catch (error) {
            throw error;
          }
        // return data;
    }
}