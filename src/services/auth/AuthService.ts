import { AxiosInstance } from "axios";

export default abstract class AuthService {
    constructor(public axiosInstance: AxiosInstance) {}
}