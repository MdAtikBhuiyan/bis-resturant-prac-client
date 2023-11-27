import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-eta-seven.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useAuth()

    //  request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-resturant-token")
        // console.log("request stop by interceptors", token, config);
        config.headers.authorization = `Bearer ${token}`
        return config;

    }, function (error) {
        return Promise.reject(error);
    })

    // response interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        // console.log("status error axios", error);
        const status = error.response.status;
        if (status === 401 || 403) {
            
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    });


    return axiosSecure;

};

export default useAxiosSecure;