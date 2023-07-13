import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError{
  constructor(
    message : string = "Token invalido"
  ){
    super(401,message)
  }
}