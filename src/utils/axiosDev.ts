import axiosLib, { AxiosInstance } from 'axios'

const axiosDev: AxiosInstance = axiosLib.create({
    baseURL: 'http://192.168.20.99:3000/',
    headers: {
        Accept: 'application/json'
    }
});

export default axiosDev;