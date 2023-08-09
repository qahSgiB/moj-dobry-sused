import z from 'zod'

import { IdModel } from '../../types'
import { emptySchema } from '../../schemas'



export const schema = {
  params: emptySchema,
  query: emptySchema,
  body: z.object({
    email: z.string().email(),
    password: z.string().min(3).max(50),
  }).strict(),
}

export type Result = IdModel