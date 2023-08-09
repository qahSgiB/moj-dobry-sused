import { NextFunction, Request, RequestHandler, Response } from "express"

import { ApiResponse, RequestValidation, ValidationError } from "shared/types";

import { handleValidationErrorResponse } from "../handleResponse";
import { Re, reErr, reOk } from "../../types/re";
import { RequestData } from "../../types";





export const validate =  <TP, TQ, TB, TR>(
  req: Request<unknown, TR, unknown, unknown>,
  validation: RequestValidation<TP, TQ, TB>
): Re<RequestData<TP, TQ, TB>, ValidationError> => {
  const paramsValidated = validation.params.safeParse(req.params);
  if (!paramsValidated.success) {
    return reErr({
      errorIn: 'params',
      error: paramsValidated.error,
    });
  }

  const queryValidated = validation.query.safeParse(req.query);
  if (!queryValidated.success) {
    return reErr({
      errorIn: 'query',
      error: queryValidated.error,
    });
  }

  const bodyValidated = validation.body.safeParse(req.body);
  if (!bodyValidated.success) {
    return reErr({
      errorIn: 'body',
      error: bodyValidated.error,
    });
  }

  return reOk({
    params: paramsValidated.data,
    query: queryValidated.data,
    body: bodyValidated.data,
  });
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