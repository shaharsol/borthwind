import { jwtDecode } from 'jwt-decode'
import User from '../models/User'

export default function jwtUsername(jwt: string | undefined): string {
    if (!jwt) return ''
    const payload = jwtDecode(jwt) as {user: User}
    return `${payload.user.firstName} ${payload.user.lastName}`
}