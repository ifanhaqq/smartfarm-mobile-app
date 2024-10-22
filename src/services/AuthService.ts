import { TokenService } from "./TokenService";
import axios from "src/utils/axios";

export class AuthService {

    private tokenService: TokenService = new TokenService();

    async login(credentials: any) {
        const { data } = await axios.post("/mobile-login", credentials);
        
        await this.tokenService.setToken(data.token);
        const token = await this.tokenService.getToken();

        return token;
    }

    async test() {
        console.log(123)
    }

    async loadUser(token: string | null) {
        const { data: user} = await axios.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return user;
    }

    async logout() {
        const token = await this.tokenService.getToken();
        await axios.post('/mobile-logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        await this.tokenService.setToken(null);
    }

}
