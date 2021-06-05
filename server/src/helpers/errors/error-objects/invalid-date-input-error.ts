export default class InvalidDateInput extends Error {
    constructor(argument: any) {
        super(`${argument} is an invalid date input.`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidDateInput)
        }
    }
}