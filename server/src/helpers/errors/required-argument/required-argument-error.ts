export class RequiredArgumentError extends Error {
    constructor(argument: string) {
        super(`${argument} can not be null or undefined.`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequiredArgumentError)
        }
    }
}