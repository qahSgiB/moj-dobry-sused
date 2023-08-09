export type Re<Ok, Error> = {
  ok: true,
  data: Ok,
} | {
  ok: false,
  error: Error,
}


export const reOk = <Ok, Err>(data: Ok): Re<Ok, Err> => ({ ok: true, data })
export const reErr = <Ok, Err>(error: Err): Re<Ok, Err> => ({ ok: false, error })