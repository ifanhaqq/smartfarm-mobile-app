import { AxiosError, AxiosResponse } from "axios";
import axios from "../utils/axios";

export class RainSpecService {

    async checkConnection() {
        try {
            const response: AxiosResponse<string> = await axios.get("/");
            console.log("Connected successfully", response.data, response.status);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getRainHistory(daysPrior: number) {
        try {
            const response: AxiosResponse<number[]> = await axios.post<number[]>("/rain-history", {
                day: daysPrior
            });

            return response.data;
        } catch (error) {
            throw error;
          }
        // return data;
    }
}