import CustomError from "@app/shared/errors/error-objects/custom-error";


export function requiredArgument(argument: string): never {
    throw new CustomError("requiredArgument", argument);
}