import axiosLib, { AxiosInstance } from 'axios';
import { TokenService } from 'src/services/TokenService';

const tokenService: TokenService = new TokenService();

const axios: AxiosInstance = axiosLib.create({
    baseURL: "https://planting-prediction.petanitech.com/api/mobile-login",
    headers: {
        Accept: 'application/json'
    }
});

// axios("http://127.0.0.1:8000/api").interceptors.request.use(async (req) => {
//     const token = await tokenService.getToken();

//     if (token !== null) {
//         req.headers["Authorization"] = `Bearer ${token}`
//     }

//     return req
// })

export default axios;