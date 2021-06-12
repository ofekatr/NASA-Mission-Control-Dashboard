
import { CustomErrorType, CustomHttpErrorType, CustomHttpErrorTypeToDataMap } from "@shared/definitions/errors";
import CustomError, { BaseAbstractCustomError } from "@shared/errors/error-objects/custom-error";
import { createUnion } from "@shared/utils/union.utils";
import { requiredArgument } from "@shared/validators/required-argument";

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
        customErrorType: CustomHttpErrorType = "default",
        ...args: any[]
    ) {
        super(customErrorType, customHttpErrorTypeToData[customErrorType]?.toString(args)!);
        this.httpStatus = customHttpErrorTypeToData[customErrorType]?.httpStatus ?? 500;
    }
}

export function verifyCustomHttpError(err: Error): err is CustomHttpError {
    return err instanceof CustomHttpError;
}

const customErrorTypeToCustomHttpErrorType: Partial<{ [key in CustomErrorType]: CustomHttpErrorType }> = {
    invalidDateInput: "invalidRequest",
    invalidNumber: "invalidRequest",
    requiredArgument: "invalidRequest",
    notFound: "notFound",
    default: "default",
}

export function mapCustomErrorToCustomHttpError(
    customError: CustomError = requiredArgument("customError")
) {
    const customHttpErrorType: CustomHttpErrorType =
        customErrorTypeToCustomHttpErrorType[customError.customErrorType] ?? "default";

    return new CustomHttpError(customHttpErrorType, customError.message);
}