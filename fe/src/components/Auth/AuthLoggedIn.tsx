import { Navigate, Outlet } from "react-router-dom";

import Loading from "../Loading/Loading";
import Auth from "./Auth";



const AuthLoggedIn = () => {
  return (
    <Auth loggedIn={ true } fallback={ <Navigate to='/login'/> } loading={ <Loading /> }>
      <Outlet/>
    </Auth>
  )
}



export default AuthLoggedIn;