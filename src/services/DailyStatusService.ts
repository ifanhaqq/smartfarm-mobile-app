import { TokenService } from "./TokenService";
import axios from "src/utils/axios";

export class DailyStatusService {
    private tokenService: TokenService = new TokenService();

    async getDailyStatus() {
        const token = await this.tokenService.getToken();
        
        const { data: dailyStatus } = await axios.get('/get-daily-status', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return dailyStatus;
    }
}