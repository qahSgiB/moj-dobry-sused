import { FeError } from "shared/types";



export class FeErrorClassed extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message);

    this.code = code;

    Object.setPrototypeOf(this, FeErrorClassed.prototype);
  }

  unClass(): FeError {
    return {
      code: this.code,
      message: this.message,
    }
  }
}