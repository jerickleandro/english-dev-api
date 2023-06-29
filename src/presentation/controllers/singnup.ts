import { MissingParamError } from '../erros/missing-param-erro'
import { badRequest } from '../helpers/http-helper'
import {HttpRequest, HttpResponse} from '../protocols/http'

export class SignUpController {
    handle (httpsRequest: HttpRequest): HttpResponse {
        if(!httpsRequest.body.name){
            return badRequest(new MissingParamError('name'))
        }
        if(!httpsRequest.body.email){
            return badRequest(new MissingParamError('email'))
        }
    }
}