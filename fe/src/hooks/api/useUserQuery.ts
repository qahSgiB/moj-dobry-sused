import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "shared/api";

import { client, validateResponse, processResponseErrorSimple } from "../../utils/api";
import { knownErrorFe } from "../../utils/knownError";



const getMe = async () => {
  const responseT = await client.get('/auth/me');
  const response = validateResponse<authApi.me.Result>(responseT.data);
  const data = processResponseErrorSimple(response);

  return data === null ? null : data.id;
}



export const useUserQuery = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (meQuery.status === 'error') {
    throw meQuery.error;
  }

  return meQuery;
}

// [note] do not use this
export const useUserQueryLoggedIn = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    select: (data) => {
      if (data === null) {
        throw knownErrorFe('expected logged in user')
      }

      return data;
    },
  });

  if (meQuery.status === 'error') {
    throw meQuery.error;
  }

  return meQuery;
}

export const useSetUserQuery = () => {
  const queryClient = useQueryClient();

  return (user: number | null) => {
    queryClient.setQueryData(['me'], user);
  }
}