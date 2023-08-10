import axios from "axios";

import { beUrl } from "../beUrl";



export const client = axios.create({
  baseURL: beUrl,
  withCredentials: true,
  validateStatus: () => true,
});