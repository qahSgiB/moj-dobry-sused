import z from 'zod'

import { IdModel } from '../../types'
import { emptySchema } from '../../schemas'



export const schema = {
  params: emptySchema,
  query: emptySchema,
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(3, 'At least 3 characters are requeried').max(50, 'At most 50 characters are allowed'),
  }).strict(),
}

export type Result = IdModel