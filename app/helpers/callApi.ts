import axios from "axios";
import validationError from "../exeptions/validationError";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api'
    })

    axiosInstance.interceptors.request.use(
        (config) => {

            //manage validation
            return config;
        },

        err => Promise.reject(err)
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            const res = err?.response
            if (res) {
                if (res.status === 422)
                {
                    throw new validationError(res.data.errors);
                    
                }
            }
        }
    )

    return axiosInstance
}

export default callApi;