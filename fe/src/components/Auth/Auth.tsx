import React from 'react'

import { useUserQuery } from '../../hooks/api';



type AuthProps = React.PropsWithChildren<{
  loggedIn: boolean,
  fallback?: React.ReactNode,
  loading?: React.ReactNode,
}>;

const Auth = (props: AuthProps) => {
  const userQuery = useUserQuery();

  if (userQuery.status === 'loading') {
    return props.loading;
  }

  if (props.loggedIn === (userQuery.data !== null)) {
    return props.children;
  } else {
    return props.fallback;
  }
}



export default Auth;