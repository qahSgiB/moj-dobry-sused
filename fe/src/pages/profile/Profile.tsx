import { useQuery } from '@tanstack/react-query';

import { authApi } from 'shared/api';

import { client, validateResponse, processResponseErrorSimple } from '../../utils/api';
import useStaticTopbarButtons from '../../components/Template/hooks/useTopbarStaticButtons';

import './Profile.css'



const getMe = async () => {
  const responseT = await client.get('/auth/me');
  const response = validateResponse<authApi.me.Result>(responseT.data);
  const data = processResponseErrorSimple(response);

  return data;
}


const Profile = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (meQuery.isError) {
    throw meQuery.error;
  }

  if (meQuery.isLoading) {
    return (
      <p>loading ...</p>
    )
  }

  return (
    <p>{ meQuery.data === null ? 'logged out' : `logged in id : ${meQuery.data.id}` }</p>
  );
}



export default Profile;