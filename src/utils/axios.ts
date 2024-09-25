import axiosLib, { AxiosInstance } from 'axios'

const axios: AxiosInstance = axiosLib.create({
    baseURL: 'https://rainspecifier.perismayu.my.id/',
    headers: {
        Accept: 'application/json'
    }
});

export default axios;