import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { authApi } from 'shared/api';
import { IdModel } from 'shared/types';

import { client, processResponseErrorForm, validateResponse } from '../../utils/api';
import { useStaticTopbarButtons } from '../../components/Template';

import './Login.css'
import { useSetUserQuery } from '../../hooks/api';



type LoginInput = {
  email: string,
  password: string,
}



const Login = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  const setUserQuery = useSetUserQuery();
  const navigate = useNavigate();

  // login mutation
  const postLogin = async (loginData: LoginInput): Promise<IdModel | undefined> => {
    const responseT = await client.post('/auth/login', loginData);
    const response = validateResponse<authApi.login.Result>(responseT.data);

    return processResponseErrorForm(response, setError, {
      'login-user-not-found': { field: 'email' },
      'login-wrong-password': { field: 'password' },
    }, { 'email': 'email', 'password': 'password' });
  }

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (loginResult) => {
      if (loginResult !== undefined) {
        setUserQuery(loginResult.id);
        navigate('/profile');
      }
    }
  });

  if (loginMutation.isError) {
    throw loginMutation.error;
  }

  // login form
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(authApi.login.schema.body) });

  const onLogin = (loginData: LoginInput) => {
    loginMutation.mutate(loginData);
  }

  return (
    <div className='login-container'>
      <form className='login' onSubmit={ handleSubmit(onLogin) } noValidate>
        <div className="login__input-container">
          <label className="login__label" htmlFor="email">Email</label>
          <input className={ 'login__input' + (errors.email === undefined ? '' : ' login__input--error') } id="email" type="email" placeholder="barack.obama@email.com" { ...register('email') } />
          { errors.email !== undefined && <p className="login__error">{ errors.email.message }</p> }
        </div>
        <div className="login__input-container">
          <label className="login__label" htmlFor="password">Password</label>
          <input className={ 'login__input' + (errors.password === undefined ? '' : ' login__input--error') } id="password" type="password" placeholder="password123" { ...register('password') } />
          { errors.password !== undefined && <p className="login__error">{ errors.password.message }</p> }
        </div>
        <input className="login__submit" type="submit" value="Log In" disabled={ loginMutation.status === 'loading' } />
      </form>
      <p className='signup-text'>Don't have an account? <Link className='signup-text__link' to='/signup'>Sign Up</Link></p>
    </div>
  )
}



export default Login;