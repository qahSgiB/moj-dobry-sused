import { ZodSchema } from 'zod';



export type RequestValidation<TParams, TQuery, TBody> = {
  params: ZodSchema<TParams>,
  query: ZodSchema<TQuery>,
  body: ZodSchema<TBody>,
};