import { ZodError } from "zod"



export type FeError = {
  code: string,
  message: string,
}

export type ValidationErrorIn = 'params' | 'query' | 'body';

export type ValidationError = {
  errorIn: ValidationErrorIn,
  error: ZodError,
}


export type ApiResponse<TData = unknown> = {
  status: 'ok',
  data: TData,
} | {
  status: 'error-be',
  data: undefined,
} | {
  status: 'error-validation',
  data: ValidationError,
} | {
  status: 'error-fe',
  data: FeError,
}