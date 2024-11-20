import { TokenService } from "./TokenService";
import axios from "src/utils/axios";
export class ReportService {
    private tokenService: TokenService = new TokenService();

    async getMonthlyWaterStats() {
        const token = await this.tokenService.getToken();

        const {data: stats} = await axios.get('/get-monthly-water-stats', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return stats;
    }
}