import { InvalidParamError, MissingParamError } from "../erros";
import { badRequest, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httpsRequest: HttpRequest): HttpResponse {
    try {
        const requiredFields = [
            "name",
            "email",
            "password",
            "passwordConfirmation",
          ];
          for (const field of requiredFields) {
            if (!httpsRequest.body[field]) {
              return badRequest(new MissingParamError(field));
            }
          }
          const isValid = this.emailValidator.isValid(httpsRequest.body.email);
          if(!isValid) {
              return badRequest(new InvalidParamError('email'));
          }
    } catch (error) {
        return serverError();
    }
  }
}
