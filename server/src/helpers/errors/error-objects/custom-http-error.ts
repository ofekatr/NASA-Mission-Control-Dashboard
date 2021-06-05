import CustomError from "@helpers/errors/error-objects/custom-error";

export default class CustomHttpError extends CustomError {
    constructor(
        public httpStatus: number = 500,
        errorMessage: string = "Internal Error"
    ) {
        super(errorMessage);
    }
}

export function createInvalidRequestHttpError(message: string) {
    return new CustomHttpError(400, `Invalid request - ${message}`);
}