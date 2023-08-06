import { ZodError } from "zod"



export type FeError = {
  code: string,
  message: string,
}



export type ApiResponse<TData = unknown> = {
  status: 'ok',
  data: TData,
} | {
  status: 'error-be',
  data: undefined,
} | {
  status: 'error-validation',
  data: ZodError,
} | {
  status: 'error-fe',
  data: FeError,
}