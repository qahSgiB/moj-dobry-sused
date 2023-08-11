import { useStaticTopbarButtons } from '../../components/Template';
import { useUserQuery } from '../../hooks/api';



const DebugMe = () => {
  useStaticTopbarButtons({ type: 'back', to: '/' }, undefined);

  const meQuery = useUserQuery();

  if (meQuery.isLoading) {
    return (
      <p>loading ...</p>
    )
  }

  return (
    <p>{ meQuery.data === null ? 'logged out' : `logged in id : ${meQuery.data}` }</p>
  );
}



export default DebugMe;