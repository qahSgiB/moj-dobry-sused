import { Request, Response, NextFunction, RequestHandler } from "express";

import { ApiResponse, RequestValidation } from "shared/types";

import expressAsyncHandler from "../expressAsyncHandler";
import { handleFeErrorResponse, handleValidationErrorResponse } from "../handleResponse";
import { loadSession, needsAuthLoggedIn, needsAuthLoggedOut } from "./session";
import { validate } from "./validate";



export const loadSessionMiddleware = expressAsyncHandler(async <TR, TP, TQ, TB>(
  req: Request<TP, ApiResponse<TR>, TB, TQ>,
  res: Response<ApiResponse<TR>>,
  next: NextFunction
) => {
  req.session = await loadSession(req, res);

  next();
})

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

export const validateMiddleware = <TResult, TParams, TQuery, TBody>(validation: RequestValidation<TParams, TQuery, TBody>): RequestHandler<TParams, ApiResponse<TResult>, TBody, TQuery> => {
  return (req: Request<TParams, ApiResponse<TResult>, TBody, TQuery>, res: Response<ApiResponse<TResult>>, next: NextFunction) => {
    const data = validate(req, validation);
    if (!data.ok) {
      handleValidationErrorResponse(res, data.error);
      return;
    }

    req.params = data.data.params;
    req.query = data.data.query;
    req.body = data.data.body;

    next();
  };
}