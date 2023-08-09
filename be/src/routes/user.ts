import { Router } from "express";

import { emptyValidation } from 'shared/schemas'
import { endpoint, endpointDoOk } from "../utils/api/endpoint";



const router = Router();

router.get('/', endpoint<number>()('session', emptyValidation, async () => {
  return endpointDoOk(4.0);
}))



export default router;
