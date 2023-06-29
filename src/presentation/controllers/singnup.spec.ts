import { SignUpController } from "./singnup";

describe('SignUpController', () => {
    test('Should retunr 400 if no name is provided', () => {
        const sut = new SignUpController();
        const httpsRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
    });
});