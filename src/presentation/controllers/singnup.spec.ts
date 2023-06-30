import { SignUpController } from "./singnup";
import { MissingParamError } from "../erros/missing-param-error";
import { InvalidParamError } from "../erros/invalid-param-error";
import { EmailValidator } from "../protocols/email-validator";
import { ServerError } from "../erros/server-error";

interface SutTypes {
    sut: SignUpController,
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    class EmailValidatorStub implements EmailValidator{
        isValid (email: string): boolean {
            return true;
        }
    }

    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
    return {
        sut,
        emailValidatorStub
    }
}

describe('SignUpController', () => {
    test('Should retunr 400 if no name is provided', () => {
        const { sut } = makeSut();
        const httpsRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'));
    });

    test('Should retunr 400 if no email is provided', () => {
        const { sut } = makeSut();
        const httpsRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    test('Should retunr 400 if no password is provided', () => {
        const { sut } = makeSut();
        const httpsRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    test('Should retunr 400 if no confirmation password is provided', () => {
        const { sut } = makeSut();
        const httpsRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
    });

    test('Should retunr 400 if an invalide email is provided', () => {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpsRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('email'));
    });

    test('Should call emaivalidator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpsRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        sut.handle(httpsRequest);
        expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
    });


    test('Should retunr 500 if email validator throws', () => {
        class EmailValidatorStub implements EmailValidator{
            isValid (email: string): boolean {
                throw new Error();
            }
        }
        const emailValidator = new EmailValidatorStub();
        const sut = new SignUpController(emailValidator);
        const httpsRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpsRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

});