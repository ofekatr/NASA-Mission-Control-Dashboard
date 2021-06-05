import { CustomErrorType, CustomErrorTypeToDataMap } from "@definitions/errors.defs";
import { createUnion } from "@helpers/union.helper";

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
        toString: (value) => `${value} is required to be a number`,
    }
}

export abstract class BaseAbstractCustomError extends Error {

}

export default class CustomError extends BaseAbstractCustomError {
    constructor(public customErrorType: CustomErrorType = "default", ...args: any) {
        super(customErrorTypeToDataMap[customErrorType]?.toString(args));

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}

export function verifyCustomError(err: Error) {
    return err instanceof BaseAbstractCustomError;
}

export function verifyCustomErrorType(err: Error, customErrorType: CustomErrorType) {
    return verifyCustomError(err) && (err as CustomError).customErrorType === customErrorType
}