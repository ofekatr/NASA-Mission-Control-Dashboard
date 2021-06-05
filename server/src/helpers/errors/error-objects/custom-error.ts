export default class CustomError extends Error {
    constructor(value: any = "An error has occured") {
        super(value);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}

export function createRequiredArgumentError(argument: string) {
    return new CustomError(`${argument} can not be null or undefined.`);
}

export function createInvalidDateInputError(dateInput: any) {
    return new CustomError(`${dateInput} is an invalid date input.`);
}

export function createInvalidNumberError(value: any) {
    return new CustomError(`${value} is required to be a number`);
}