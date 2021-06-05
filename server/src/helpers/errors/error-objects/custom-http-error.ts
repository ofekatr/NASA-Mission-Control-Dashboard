import { CustomHttpErrorType, CustomHttpErrorTypeToDataMap } from "@definitions/errors.defs";
import { BaseAbstractCustomError } from "@helpers/errors/error-objects/custom-error";
import { createUnion } from "@helpers/union.helper";

export const CustomHttpErrorsUnion = createUnion(
    "default",
    "invalidRequest",
    "notFound",
);

export const customHttpErrorTypeToData: CustomHttpErrorTypeToDataMap = {
    default: {
        httpStatus: 500,
        toString: () => "Internal Error",
    },
    invalidRequest: {
        httpStatus: 400,
        toString: (message) => `Invalid request - ${message}`
    },
    notFound: {
        httpStatus: 404,
        toString: () => "Resource not found",
    }
}

export default class CustomHttpError extends BaseAbstractCustomError {
    public readonly httpStatus: number;

    constructor(
        customHttpErrorType: CustomHttpErrorType = "default",
        ...args: any[]
    ) {
        super(customHttpErrorTypeToData[customHttpErrorType]?.toString(args));
        this.httpStatus = customHttpErrorTypeToData[customHttpErrorType]?.httpStatus ?? 500;
    }
}