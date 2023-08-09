import { Router } from "express";

import { authApi } from 'shared/api'

import { endpoint, endpointDoOk, endpointDoResult } from "../utils/api/endpoint";
import { sessionRepository } from "../repositories";



const router = Router();

router.get('/me', endpoint<authApi.me.Result>()('session', authApi.me.schema, async (_data, session) => {
  return endpointDoOk(session.userId === null ? null : { id: session.userId });
}))

router.post('/login', endpoint<authApi.login.Result>()('logged-out', authApi.login.schema, async (data, session, _req, res) => {
  const loginResult = await sessionRepository.login({
    sid: session.id,
    user: data.body,
  });

  if (loginResult.isOk) {
    res.cookie('sid', loginResult.value.id, { httpOnly: true, sameSite: 'lax' });
  }

  return endpointDoResult(loginResult.map(data => ({ id: data.userId })));
}))

router.post('/logout', endpoint<authApi.logout.Result>()('logged-in', authApi.logout.schema, async (_data, session) => {
  const logoutResult = await sessionRepository.logout({
    id: session.id,
  });

  return endpointDoResult(logoutResult.map(() => null));
}))

router.post('/signup', endpoint<authApi.signup.Result>()('logged-out', authApi.signup.schema, async (data, session, _req, res) => {
  const signupResult = await sessionRepository.signup({
    sid: session.id,
    user: data.body,
  });

  if (signupResult.isOk) {
    res.cookie('sid', signupResult.value.id, { httpOnly: true, sameSite: 'lax' });
  }

  return endpointDoResult(signupResult.map(data => ({ id: data.userId })));
}))



export default router;