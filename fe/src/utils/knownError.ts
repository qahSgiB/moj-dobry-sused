import { ApiResponseError } from "shared/types";



type KnownErrorData = {
  from: 'fe',
  data: {
    message: string,
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



export const knownErrorFe = (message: string) => new KnownError({ from: 'fe', data: { message } });
export const knownErrorBe = (error: ApiResponseError) => new KnownError({ from: 'be', data: error });