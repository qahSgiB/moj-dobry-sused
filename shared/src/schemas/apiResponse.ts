import { z } from 'zod'



export const apiResponseSchema = z.object({
    status: z.string(),
    data: z.unknown(),
}).strict();