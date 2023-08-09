import { NextFunction, Request, RequestHandler, Response } from 'express';

import z from 'shared/zod';
import { ApiResponse, FeError } from 'shared/types';

import expressAsyncHandler from '../expressAsyncHandler';
import { sessionRepository } from '../../repositories';
import { Session, SessionLoggedIn, SessionLoggedOut } from '../../types';
import { Re, reErr, reOk } from '../../types/re'
import { handleFeErrorResponse } from '../handleResponse';




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

export const loadSessionMiddleware = expressAsyncHandler(async <TR, TP, TQ, TB>(
  req: Request<TP, ApiResponse<TR>, TB, TQ>,
  res: Response<ApiResponse<TR>>,
  next: NextFunction
) => {
  req.session = await loadSession(req, res);

  next();
})


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


export const needsAuthMiddleware = <TR, TP, TQ, TB>(authType: 'loggedIn' | 'loggedOut'): RequestHandler<TP, ApiResponse<TR>, TB, TQ> => {
  return (req: Request<TP, ApiResponse<TR>, TB, TQ>, res: Response<ApiResponse<TR>>, next: NextFunction) => {
    if (req.session === undefined) {
      throw new Error('needsAuth middleware can\'t be used without session attribute in Request object');
    }

    const needsAuthResult = (authType === 'loggedIn') ? needsAuthLoggedIn(req.session) : needsAuthLoggedOut(req.session);
    if (!needsAuthResult.ok) {
      handleFeErrorResponse(res, needsAuthResult.error, 401);
      return;
    }

    next();
  }
}