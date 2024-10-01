import { useContext } from "react";
import AuthService from "../services/auth/AuthService";
import { AuthContext } from "../components/auth/auth/Auth";
import axios, { AxiosInstance } from 'axios'

export default function useService<T extends AuthService>(Service: { new(axiosInstance: AxiosInstance): T }): T {
    const { jwt } = useContext(AuthContext)
    console.log('jwt', jwt)
    const axiosInstance = axios.create({
        // headers: {
        //     Authorization: `Bearer ${jwt}`
        // }
    })
    axiosInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${jwt}`
        return config
    })

    const service = new Service(axiosInstance)
    return service

}