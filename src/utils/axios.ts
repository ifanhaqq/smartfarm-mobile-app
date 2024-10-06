import axiosLib, { AxiosInstance } from 'axios'

const axios =  (baseUrl: string) => {

    const axiosInstance: AxiosInstance = axiosLib.create({
        baseURL: baseUrl,
        headers: {
            Accept: 'application/json'
        }
    });

    return axiosInstance;

}



export default axios;