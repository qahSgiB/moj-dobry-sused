import { z } from "shared/zod";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";

import { ApiResponse } from "shared/types";

import { knownErrorBe } from "../knownError";



export const processResponseErrorSimple = <T>(response: ApiResponse<T>): T => {
  if (response.status !== 'ok') {
    throw knownErrorBe(response);
  }

  return response.data;
}

export const processResponseErrorForm = <TFieldValues extends FieldValues, TData>(
  response: ApiResponse<TData>,
  setError: UseFormSetError<TFieldValues>,
  onFeError?: Record<string, { field: Path<TFieldValues>, message?: string }>,
  onValidationError?: Record<string, Path<TFieldValues>>,
): TData | undefined => {
  if (response.status === 'ok') {
    return response.data;
  }

  if (response.status === 'error-fe' && onFeError !== undefined) {
    const feError = response.data;

    if (feError.code in onFeError) {
      const { field, message } = onFeError[feError.code];
      setError(field, { message: message ?? feError.message });
      return undefined;
    }
  }

  if (response.status === 'error-validation' && onValidationError !== undefined) {
    let unknownValidationError = response.data.error.issues.length === 0;

    for (const issue of response.data.error.issues) {
      if (issue.path.length !== 1) {
        unknownValidationError = true;
        break;
      }

      const fieldSafe = z.string().safeParse(issue.path[0]);
      if (!fieldSafe.success) {
        unknownValidationError = true;
        break;
      }

      const field = fieldSafe.data;

      if (!(field in onValidationError)) {
        unknownValidationError = true;
        break;
      }

      setError(onValidationError[field], { message: issue.message });
    }

    if (!unknownValidationError) {
      return undefined;
    }
  }

  throw knownErrorBe(response);
}