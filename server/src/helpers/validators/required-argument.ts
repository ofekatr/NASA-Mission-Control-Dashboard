import CustomError from "@helpers/errors/error-objects/custom-error";

export function requiredArgument(argument: string): never {
    throw new CustomError("requiredArgument", argument);
}