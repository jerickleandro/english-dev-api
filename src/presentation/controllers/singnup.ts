import {HttpRequest, HttpResponse} from '../protocols/http'

export class SignUpController {
    handle (httpsRequest: HttpRequest): HttpResponse {
        if(!httpsRequest.body.name){
            return {
                statusCode: 400,
                body: new Error('Missing param: name')
            }
        }
        if(!httpsRequest.body.email){
            return {
                statusCode: 400,
                body: new Error('Missing param: email')
            }
        }
    }
}