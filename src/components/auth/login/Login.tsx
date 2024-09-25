import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/Login';
import authService from '../../../services/auth';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { login } from '../../../redux/authSlice'
import { useContext } from 'react';
import { AuthContext } from '../auth/Auth';

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<LoginModel>();
    const dispatch = useAppDispatch()

    const { jwt, setJwt} = useContext(AuthContext)

    async function submit(loginModel: LoginModel) {
        try {
            const jwt = await authService.login(loginModel)
            setJwt(jwt)
            dispatch(login(jwt))
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <label>email</label>
                <input type="text" {...register('email')} />
                <br/>
                <label>password</label>
                <input type="password" {...register('password')} />
                <br/>
                <button>Login</button>                
            </form>
        </div>
    )
}

export default Login