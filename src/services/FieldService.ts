import { TokenService } from "./TokenService";
import axios from "src/utils/axios";

export class FieldService {
    private tokenService: TokenService = new TokenService();

    async getAllFields() {
        const token = await this.tokenService.getToken();
        console.log(token)
        const { data: field } = await axios.post('/get-fields', {},  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return field;
    }

    async getField(fieldId: number) {
        const token = await this.tokenService.getToken();
        const { data: field } = await axios.post('/get-field', {
            field_id: fieldId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return field;
    }
}