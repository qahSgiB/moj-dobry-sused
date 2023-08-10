import { knownErrorFe } from "../../utils/knownError";



const RouteNotFound = () => {
  throw knownErrorFe('Route not found')
}



export default RouteNotFound;