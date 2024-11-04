import { TokenService } from "./TokenService";
import axios from "src/utils/axios";

export class PredictionService {
    private tokenService: TokenService = new TokenService();

    async predict(field_id: number) {
        const token = await this.tokenService.getToken();

        const { data: prediction } = await axios.post('/predict', {
            field_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return prediction;
    }
}