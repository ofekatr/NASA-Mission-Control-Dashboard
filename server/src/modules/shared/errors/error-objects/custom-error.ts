import { CustomErrorType, CustomErrorTypeToDataMap } from "@shared/definitions/errors";
import { createUnion } from "@shared/utils/union.utils";


export const CustomErrorsUnion = createUnion(
    "default",
    "notFound",
    "requiredArgument",
    "invalidDateInput",
    "invalidNumber",
    "invalidPlanet"
);

export const customErrorTypeToDataMap: CustomErrorTypeToDataMap = {
    default: {
        toString: () => "An error has occurred.",
    },
    notFound: {
        toString: () => "The resource was not found.",
    },
    requiredArgument: {
        toString: (argument) => `${argument} can not be null or undefined.`,
    },
    invalidDateInput: {
        toString: (dateInput) => `${dateInput} is an invalid date input.`,
    },
    invalidNumber: {
        toString: (value) => `${value} is not a valid number.`,
    },
    invalidPlanet: {
        toString: (value) => `The target planet ${value} does not exist.`
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

export function verifyBaseCustomError(err: Error): err is BaseAbstractCustomError {
    return err instanceof BaseAbstractCustomError;
}

export function verifyCustomError(err: Error): err is CustomError {
    return err instanceof CustomError;
}

export function verifyCustomErrorType(err: Error, customErrorType: CustomErrorType) {
    return verifyBaseCustomError(err) && err.customErrorType === customErrorType
}