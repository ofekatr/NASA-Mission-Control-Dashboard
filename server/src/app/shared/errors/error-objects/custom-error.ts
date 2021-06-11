import { CustomErrorType, CustomErrorTypeToDataMap } from "@app/shared/definitions/errors";
import { createUnion } from "@app/shared/utils/union.utils";


export const CustomErrorsUnion = createUnion(
    "default",
    "notFound",
    "requiredArgument",
    "invalidDateInput",
    "invalidNumber",
);

export const customErrorTypeToDataMap: CustomErrorTypeToDataMap = {
    default: {
        toString: () => "An error has occurred",
    },
    notFound: {
        toString: () => "Resource not found",
    },
    requiredArgument: {
        toString: (argument) => `${argument} can not be null or undefined.`,
    },
    invalidDateInput: {
        toString: (dateInput) => `${dateInput} is an invalid date input.`,
    },
    invalidNumber: {
        toString: (value) => `${value} is not a valid number`,
    }
}

export abstract class BaseAbstractCustomError extends Error {
    constructor(public customErrorType: string, message: string) {
        super(message);
    }
}

export default class CustomError extends BaseAbstractCustomError {
    constructor(customErrorType: CustomErrorType = "default", ...args: any) {
        super(customErrorType, customErrorTypeToDataMap[customErrorType]?.toString(args)!);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}

export function verifyCustomError(err: Error): err is BaseAbstractCustomError {
    return err instanceof BaseAbstractCustomError;
}

export function verifyCustomErrorType(err: Error, customErrorType: CustomErrorType) {
    return verifyCustomError(err) && err.customErrorType === customErrorType
}