import { MissingParamError } from '../erros/missing-param-erro'
import {HttpRequest, HttpResponse} from '../protocols/http'

export class SignUpController {
    handle (httpsRequest: HttpRequest): HttpResponse {
        if(!httpsRequest.body.name){
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }
        }
        if(!httpsRequest.body.email){
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }
    }
}