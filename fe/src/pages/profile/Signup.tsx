import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'shared/zod';
import { IdModel } from 'shared/types';
import { authApi } from 'shared/api';

import { useStaticTopbarButtons } from '../../components/Template';
import { useSetUserQuery } from '../../hooks/api';
import { client, validateResponse, processResponseErrorForm } from '../../utils/api';

import './Signup.css'



type SignupInput = {
  name: string,
  surname: string,
  email: string,
  password: string,
}

type SignupFormInput = SignupInput & {
  passwordRepeat: string,
}


const signupSchema = authApi.signup.schema.body.extend({
  passwordRepeat: z.string(),
}).refine(
  signupInput => signupInput.password === signupInput.passwordRepeat,
  {
    path: ['passwordRepeat'],
    message: 'Passwords do not match'
  }
)



const Signup = () => {
  useStaticTopbarButtons({ type: 'back', to: '/login' }, undefined);

  const setUserQuery = useSetUserQuery();
  const navigate = useNavigate();

  // signup mutation
  const postSignup = async (signupData: SignupInput): Promise<IdModel | undefined> => {
    const responseT = await client.post('/auth/signup', signupData);
    const response = validateResponse<authApi.signup.Result>(responseT.data);

    return processResponseErrorForm(response, setError, {
      'signup-email-already-used': { field: 'email' },
    }, { 'name': 'name', 'surname': 'surname', 'email': 'email', 'password': 'password' }); // [todo]
  }

  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: (signupResult) => {
      if (signupResult !== undefined) {
        setUserQuery(signupResult.id);
        navigate('/profile');
      }
    }
  });

  if (signupMutation.isError) {
    throw signupMutation.error;
  }

  // signup form
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupFormInput>({ resolver: zodResolver(signupSchema) });

  const onSignup = (signupData: SignupFormInput) => {
    signupMutation.mutate({
      name: signupData.name,
      surname: signupData.surname,
      email: signupData.email,
      password: signupData.password,
    });
  }

  return (
    <div className='signup-container'>
      <form className='signup' onSubmit={ handleSubmit(onSignup) } noValidate>
        <div className="signup__input-container">
          <label className="signup__label" htmlFor="name">Name</label>
          <input className={ 'signup__input' + (errors.name === undefined ? '' : ' signup__input--error') } id="name" type="texst" placeholder="Barack" { ...register('name') } />
          { errors.name !== undefined && <p className="signup__error">{ errors.name.message }</p> }
        </div>
        <div className="signup__input-container">
          <label className="signup__label" htmlFor="surname">Surname</label>
          <input className={ 'signup__input' + (errors.surname === undefined ? '' : ' signup__input--error') } id="surname" type="text" placeholder="Obama" { ...register('surname') } />
          { errors.surname !== undefined && <p className="signup__error">{ errors.surname.message }</p> }
        </div>
        <div className="signup__input-container">
          <label className="signup__label" htmlFor="email">Email</label>
          <input className={ 'signup__input' + (errors.email === undefined ? '' : ' signup__input--error') } id="email" type="email" placeholder="barack.obama@email.com" { ...register('email') } />
          { errors.email !== undefined && <p className="signup__error">{ errors.email.message }</p> }
        </div>
        <div className="signup__input-container">
          <label className="signup__label" htmlFor="password">Password</label>
          <input className={ 'signup__input' + (errors.password === undefined ? '' : ' signup__input--error') } id="password" type="password" placeholder="password123" { ...register('password') } />
          { errors.password !== undefined && <p className="signup__error">{ errors.password.message }</p> }
        </div>
        <div className="signup__input-container">
          <label className="signup__label" htmlFor="passwordRepeat">Repeat password</label>
          <input className={ 'signup__input' + (errors.passwordRepeat === undefined ? '' : ' signup__input--error') } id="passwordRepeat" type="password" placeholder="password123" { ...register('passwordRepeat') } />
          { errors.passwordRepeat !== undefined && <p className="signup__error">{ errors.passwordRepeat.message }</p> }
        </div>
        <input className="signup__submit" type="submit" value="Sign Up" disabled={ signupMutation.status === 'loading' } />
      </form>
      <p className='login-text'>Already have an account? <Link className='login-text__link' to='/login'>Log In</Link></p>
    </div>
  )
}



export default Signup;