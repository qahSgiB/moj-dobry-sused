import { ApiResponse } from "shared/types";

import { knownErrorBe } from "../knownError";



export const processResponseErrorSimple = <T>(response: ApiResponse<T>): T => {
  if (response.status !== 'ok') {
    throw knownErrorBe(response);
  }

  return response.data;
}