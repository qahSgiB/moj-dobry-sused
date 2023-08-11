import { useQuery } from "@tanstack/react-query";

import { authApi } from "shared/api";

import { client, validateResponse, processResponseErrorSimple } from "../../utils/api";



const getMe = async () => {
  const responseT = await client.get('/auth/me');
  const response = validateResponse<authApi.me.Result>(responseT.data);
  const data = processResponseErrorSimple(response);

  return data === null ? null : data.id;
}



const useUserQuery = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (meQuery.status === 'error') {
    throw meQuery.error;
  }

  return meQuery;
}



export default useUserQuery;