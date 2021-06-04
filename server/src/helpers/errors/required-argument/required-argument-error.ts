export class RequiredArgumentError extends Error {
    constructor(arguments: string) {
        super(`${arguments} can not be null or undefined.`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequiredArgumentError)
        }
    }
}