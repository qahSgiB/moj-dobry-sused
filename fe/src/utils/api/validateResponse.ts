import { apiResponseSchema } from 'shared/schemas'
import { ApiResponse } from 'shared/types'
import { knownErrorFe } from '../knownError';



export const validateResponse = <T>(response: unknown): ApiResponse<T> => {
  const resposeParsed = apiResponseSchema.safeParse(response);
  if (!resposeParsed.success) {
    throw knownErrorFe('Unknown api response');
  }

  // [note] unsafe
  return resposeParsed.data as ApiResponse<T>;
}