import { useStaticTopbarButtons } from '../../components/Template';

import './Profile.css'



const Profile = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  return (
    <p>tutola bude profile stranka</p>
  );
}



export default Profile;