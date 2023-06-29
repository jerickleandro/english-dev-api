import { MissingParamError } from "../erros/missing-param-erro";
import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpsRequest: HttpRequest): HttpResponse {
    const requiredFields = ["name", "email"];
    for (const field of requiredFields) {
      if (!httpsRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
