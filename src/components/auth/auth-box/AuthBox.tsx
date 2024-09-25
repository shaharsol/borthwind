import './AuthBox.css'
import { NavLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import User from '../../../models/User'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { logout as logoutAction } from '../../../redux/authSlice'

export default function AuthBox(): JSX.Element {
    const dispatch = useAppDispatch()

    const jwt = useAppSelector((state) => state.auth.jwt)
    const name = useMemo(() => {
        if (!jwt) return ''
        const payload = jwtDecode(jwt) as {user: User}
        return `${payload.user.firstName} ${payload.user.lastName}`
    }, [jwt])

    function logout() {
        dispatch(logoutAction())
    }

    return (
        <div className='Auth'>
            
            {jwt && <p>hello {name} | <button onClick={logout}>logout</button></p> }

            {!jwt && <NavLink to="/login">login</NavLink>}
            
        </div>
    )
}