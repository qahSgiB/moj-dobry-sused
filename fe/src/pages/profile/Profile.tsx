import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { authApi, userApi } from 'shared/api';

import { client, processResponseErrorSimple, validateResponse } from '../../utils/api';
import { useStaticTopbarButtons } from '../../components/Template';
import { useSetUserQuery } from '../../hooks/api';

import Loading from '../../components/Loading/Loading';

import './Profile.css'



const getDebugProfile = async () => {
  const responseT = await client.get('/user/debug-profile');
  const response = validateResponse<userApi.debugProfile.Result>(responseT.data);
  return processResponseErrorSimple(response);
}


const Profile = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  const navigate = useNavigate();
  const setUserQuery = useSetUserQuery();

  // debugProfile query
  const debugProfileQuery = useQuery({
    queryKey: ['debugProfile'],
    queryFn: getDebugProfile,
  });

  if (debugProfileQuery.isError) {
    throw debugProfileQuery.error;
  }

  // logout mutation
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

  if (debugProfileQuery.isLoading) {
    return <Loading />
  }

  return (
    <div className='profile-container'>
      <p style={ { marginBottom: '2rem' } }>meno : { debugProfileQuery.data.name } { debugProfileQuery.data.surname }</p>
      <button className='profile__logout-button' onClick={ onLogout }>Logout</button>
    </div>
  );
}



export default Profile;