import z from 'zod'

import { IdModel } from '../../types'
import { emptySchema } from '../../schemas'



export const schema = {
  params: emptySchema,
  query: emptySchema,
  body: z.object({
    name: z.string().min(2, 'At least 2 characters are requeried').max(30, 'At most 30 characters are allowed'),
    surname: z.string().min(2, 'At least 2 characters are requeried').max(30, 'At most 30 characters are allowed'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(3, 'At least 3 characters are requeried').max(50, 'At most 50 characters are allowed'),
  }).strict(),
}

export type Result = IdModel