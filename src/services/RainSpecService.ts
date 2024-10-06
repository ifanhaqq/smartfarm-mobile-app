import { AxiosError, AxiosResponse } from "axios";
import axios from "../utils/axios";

export class RainSpecService {

    private serviceUrl = "https://rainspecifier.perismayu.my.id/";

    async checkConnection() {
        try {
            const response: AxiosResponse<string> = await axios(this.serviceUrl).get("/");
            console.log("Connected successfully", response.data, response.status);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getRainHistory(daysPrior: number) {
        try {
            const response: AxiosResponse<number[]> = await axios(this.serviceUrl).post<number[]>("/rain-history", {
                day: daysPrior
            });

            return response.data;
        } catch (error) {
            throw error;
          }
        // return data;
    }
}