export class SignUpController {
    handle (httpsRequest: any): any {
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