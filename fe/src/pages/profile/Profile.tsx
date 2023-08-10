import useStaticTopbarButtons from '../../components/Template/hooks/useTopbarStaticButtons';

import './Profile.css'



const Profile = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  return (
    <p>profil</p>
  );
}



export default Profile;