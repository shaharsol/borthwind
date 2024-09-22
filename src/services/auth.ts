import axios from "axios";
import Login from "../models/Login";
import User from "../models/User";
import config from "../util/config";
import { JwtPayload, verify } from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";

class Auth {
    async login(login: Login): Promise<string> {
        console.log(`${process.env.REACT_APP_REST_SERVER}/${config.authPath}/login`)
        const response = await axios.post<string>(`${process.env.REACT_APP_REST_SERVER}/${config.authPath}/login`, login)
        const jwt = response.data
        return jwt;
        // const payload = verify(jwt, '') as JwtPayload

    }
}

const auth = new Auth()
export default auth;