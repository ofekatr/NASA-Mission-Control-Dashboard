import { CustomErrorsUnion } from "@helpers/errors/error-objects/custom-error";
import { CustomHttpErrorsUnion } from "@helpers/errors/error-objects/custom-http-error";

export interface CustomErrorData {
    toString: (..._args: any[]) => string;
}

export interface CustomHttpErrorData {
    httpStatus: number;
    toString: (..._args: any[]) => string;
}

export type CustomErrorType = typeof CustomErrorsUnion.type;

export type CustomHttpErrorType = typeof CustomHttpErrorsUnion.type;

export type CustomErrorTypeToDataMap = Partial<{ [key in CustomErrorType]: CustomErrorData }>;

export type CustomHttpErrorTypeToDataMap = Partial<{ [key in CustomHttpErrorType]: CustomHttpErrorData }>;