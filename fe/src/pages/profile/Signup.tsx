import { useStaticTopbarButtons } from '../../components/Template';

import './Signup.css'



const Signup = () => {
  useStaticTopbarButtons({ type: 'back', to: '/login' }, undefined);

  return (
    <p>tutola bude signup stranka</p>
  )
}



export default Signup;