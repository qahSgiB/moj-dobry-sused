import { Router } from "express";

import { userApi } from "shared/api";

import { userRepository } from "../repositories";
import { endpoint, endpointDoResult } from "../utils/api/endpoint";



const router = Router();

router.get('/debug-profile', endpoint<userApi.debugProfile.Result>()('logged-in', userApi.debugProfile.schema, async (_data, session) => {
  const debugProfileResult = await userRepository.debugProfile({
    id: session.userId,
  });

  return endpointDoResult(debugProfileResult);
}))



export default router;
