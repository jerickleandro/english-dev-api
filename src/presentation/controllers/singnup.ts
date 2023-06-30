import { MissingParamError } from '../erros/missing-param-erro';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
  handle(httpsRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!httpsRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
