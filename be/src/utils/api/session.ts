import { Request, Response } from 'express';

import z from 'shared/zod';
import { FeError } from 'shared/types';

import { sessionRepository } from '../../repositories';
import { Session, SessionLoggedIn, SessionLoggedOut } from '../../types';
import { Re, reErr, reOk } from '../../types/re'




const sidSchema = z.string().uuid();

export const loadSession = async <TR>(
  req: Request<unknown, TR, unknown, unknown>,
  res: Response<TR>
): Promise<Session> => {
  if ('sid' in req.cookies) {
    const sidValidated = sidSchema.safeParse(req.cookies['sid']);

    if (sidValidated.success) {
      const sid = sidValidated.data;
      const session = await sessionRepository.getUserId({ id: sid });
  
      if (session !== null) {
        return {
          id: sid,
          userId: session.userId,
        };
      }
    }
  }

  const session = await sessionRepository.create();
  res.cookie('sid', session.id, { httpOnly: true, sameSite: 'lax' });

  return {
    id: session.id,
    userId: null,
  };
}


export const needsAuthLoggedIn = (session: Session): Re<SessionLoggedIn, FeError> => {
  if (session.userId === null) {
    return reErr({
      code: 'needs-auth-logged-in',
      message: 'User needs to be logged in to perform this action',
    })
  }

  return reOk({
    id: session.id,
    userId: session.userId
  });
}

export const needsAuthLoggedOut = (session: Session): Re<SessionLoggedOut, FeError> => {
  if (session.userId !== null) {
    return reErr({
      code: 'needs-auth-logged-out',
      message: 'User needs to be logged out to perform this action',
    })
  }

  return reOk({
    id: session.id
  });
}