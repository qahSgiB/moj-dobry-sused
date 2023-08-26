import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { authApi } from 'shared/api';

import { client, processResponseErrorSimple, validateResponse } from '../../utils/api';
import { useStaticTopbarButtons } from '../../components/Template';
import { useSetUserQuery } from '../../hooks/api';

import './Profile.css'



const Profile = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  const navigate = useNavigate();

  const setUserQuery = useSetUserQuery();

  const postLogout = async (): Promise<void> => {
    const responseT = await client.post('/auth/logout');
    const response = validateResponse<authApi.logout.Result>(responseT.data);
    processResponseErrorSimple(response);
  }

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setUserQuery(null);
      navigate('/login');
    }
  });

  if (logoutMutation.isError) {
    throw logoutMutation.error;
  }

  const onLogout = () => {
    logoutMutation.mutate();
  }

  return (
    <div className='profile-container'>
      <p style={ { marginBottom: '2rem' } }>tutola bude profile stranka</p>
      <button className='profile__logout-button' onClick={ onLogout }>Logout</button>
    </div>
  );
}



export default Profile;