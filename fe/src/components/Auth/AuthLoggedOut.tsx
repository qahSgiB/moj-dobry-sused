import { Navigate, Outlet } from "react-router-dom";

import Loading from "../Loading/Loading";
import Auth from "./Auth";



const AuthLoggedOut = () => {
  return (
    <Auth loggedIn={ false } fallback={ <Navigate to='/profile'/> } loading={ <Loading /> }>
      <Outlet/>
    </Auth>
  )
}



export default AuthLoggedOut;