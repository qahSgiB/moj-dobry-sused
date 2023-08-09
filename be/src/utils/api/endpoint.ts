import { Request, Response } from 'express'

import { ApiResponse, FeError, RequestValidation } from "shared/types";

import { handleFeErrorResponse, handleOkResponse, handleValidationErrorResponse } from '../handleResponse';
import { validate } from './validate';
import { loadSession, needsAuthLoggedIn, needsAuthLoggedOut } from './session';
import { FeErrorClassed, RequestData, Session, SessionLoggedIn, SessionLoggedOut } from "../../types";
import { Re, reOk } from '../../types/re';
import { Result } from '@badrap/result';
import expressAsyncHandler from '../expressAsyncHandler';



type AuthType = 'no-session' | 'session' | 'logged-in' | 'logged-out';

type AuthTypeSession<AT extends AuthType> = 
    AT extends 'no-session' ? null
  : AT extends 'session'    ? Session
  : AT extends 'logged-in'  ? SessionLoggedIn
  : AT extends 'logged-out' ? SessionLoggedOut
  : never;


type HandleResult<TData> = {
  status: 'ok',
  data: TData,
} | {
  status: 'error-fe',
  error: FeError,
  code?: number,
}

export const endpointDoOk      = <T>(data: T)                      : HandleResult<T> => ({ status: 'ok', data: data });
export const endpointDoFeError = <T>(error: FeError, code?: number): HandleResult<T> => ({ status: 'error-fe', error: error, code: code });

export const endpointDoResult = <T>(result: Result<T, FeErrorClassed>, code?: number): HandleResult<T> => {
  return result.isOk ? endpointDoOk(result.value) : endpointDoFeError(result.error.unClass(), code);
};


// [todo] ou nou nou
// [note] pouziva sa 'as' operator
// [note] funkciu menit len velmi opatrne
const endpointSession = <AT extends AuthType>(authType: AT, session: Session): Re<AuthTypeSession<AT>, FeError> => {
  if (authType === 'logged-in') {
    return needsAuthLoggedIn(session) as Re<AuthTypeSession<AT>, FeError>;
  } else if (authType === 'logged-out') {
    return needsAuthLoggedOut(session) as Re<AuthTypeSession<AT>, FeError>;
  } else if (authType === 'session') {
    return reOk(session) as Re<AuthTypeSession<AT>, FeError>;
  } else { // authType === 'no-session'
    return reOk(null) as Re<AuthTypeSession<AT>, FeError>;
  }
}

const endpointUncurried = <AT extends AuthType, TR, TP, TQ, TB>(
  authType: AT,
  validation: RequestValidation<TP, TQ, TB>,
  handle: (data: RequestData<TP, TQ, TB>, session: AuthTypeSession<AT>, req: Request<unknown, ApiResponse<TR>, unknown, unknown>, res: Response) => Promise<HandleResult<TR>>,
) => {
  return expressAsyncHandler(async (req: Request<unknown, ApiResponse<TR>, unknown, unknown>, res: Response<ApiResponse<TR>>) => {
    const session = await loadSession(req, res);

    const sessionAuthed = endpointSession(authType, session);
    if (!sessionAuthed.ok) {
      handleFeErrorResponse(res, sessionAuthed.error, 401);
      return;
    }

    const data = validate(req, validation);
    if (!data.ok) {
      handleValidationErrorResponse(res, data.error);
      return;
    }

    const handleResult = await handle(data.data, sessionAuthed.data, req, res);

    if (handleResult.status === 'ok') {
      handleOkResponse(res, handleResult.data);
    } else {
      handleFeErrorResponse(res, handleResult.error, handleResult.code);
    }
  });
}


/** 
 * curried version of endpointUncurried
 * 
 * in endpointUncurried funcion it would be useful to
 *  - specify TResult (typechecking of endpoints)
 *  - let typescript infer other type parameters (TParams, TQuery, TBody) (they are easily infered from validation parameter)
 * problem is that, typescript can only infer all or none paramateres
 */
export const endpoint = <TResult>() => <AT extends AuthType, TP, TQ, TB>(authType: AT, validation: RequestValidation<TP, TQ, TB>, handle: (data: RequestData<TP, TQ, TB>, session: AuthTypeSession<AT>, req: Request<unknown, ApiResponse<TResult>, unknown, unknown>, res: Response) => Promise<HandleResult<TResult>>) => endpointUncurried(authType, validation, handle);