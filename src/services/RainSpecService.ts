import { AxiosError, AxiosResponse } from "axios";
import axios from "../utils/axios";
import { TokenService } from "./TokenService";

export class RainSpecService {

    private serviceUrl = "http://172.31.60.22:3000/";
    private token: TokenService = new TokenService(); 

    async checkConnection() {
        try {
            const response: AxiosResponse<string> = await axios(this.serviceUrl).get("/");
            console.log("Connected successfully", response.data, response.status);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getRainHistory(daysPrior: number) {

        const token = await this.token.getToken();
        console.log(token)

        try {
            const response: AxiosResponse<number[]> = await axios(this.serviceUrl).post<number[]>("/rain-history", {
                day: daysPrior,
                
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            throw error;
          }
        // return data;
    }

    async getRainHistoryCalendar(end_day: string, day: number) {
        const token = await this.token.getToken();

        try {
            const response: AxiosResponse<number[]> = await axios(this.serviceUrl).post<number[]>("/rain-history-calendar", {
                end_day,
                day
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
          }
    }
}