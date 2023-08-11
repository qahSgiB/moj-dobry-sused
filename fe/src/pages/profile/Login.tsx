import { useStaticTopbarButtons } from '../../components/Template';

import './Login.css'



const Login = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  return (
    <p>tutola bude login stranka</p>
  )
}



export default Login;