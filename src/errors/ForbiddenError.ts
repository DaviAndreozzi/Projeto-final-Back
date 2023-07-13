import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError{
  constructor(
    message : string = "Token valido, mas sem permissões suficientes"
  ){
    super (403,message)
  }
}