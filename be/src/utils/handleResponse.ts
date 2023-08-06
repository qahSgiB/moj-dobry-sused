import { Response } from "express"

import { FeError, ApiResponse } from "shared/types";
import { ZodError } from "shared/zod";




export const handleOkResponse = <TData>(res: Response<ApiResponse<TData>>, data: TData) => {
  res.status(200).send({
    status: 'ok',
    data,
  });
}

export const handleBeErrorRespone = <TData>(res: Response<ApiResponse<TData>>, status: number) => {
  res.status(status).send({
    status: 'error-be',
    data: undefined,
  });
}

export const handleValidationErrorResponse = <TData>(res: Response<ApiResponse<TData>>, error: ZodError) => {
  res.status(400).send({
    status: 'error-validation',
    data: error,
  });
}

export const handleFeErrorResponse = <TData>(res: Response<ApiResponse<TData>>, error: FeError, code?: number) => {
  res.status(code ?? 400).send({
    status: 'error-fe',
    data: error,
  });
}