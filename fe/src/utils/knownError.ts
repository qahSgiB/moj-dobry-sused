import { ApiResponseError } from "shared/types";



type KnownErrorData = {
  from: 'fe',
  data: {
    message: string,
    code?: string
  },
} | {
  from: 'be',
  data: ApiResponseError,
}



export class KnownError extends Error {
  data: KnownErrorData;

  constructor(data: KnownErrorData) {
    super();

    this.data = data;

    Object.setPrototypeOf(this, KnownError.prototype);
  }
}



export const knownErrorFe = (message: string, code?: string) => new KnownError({ from: 'fe', data: { message, code } });
export const knownErrorBe = (error: ApiResponseError) => new KnownError({ from: 'be', data: error });