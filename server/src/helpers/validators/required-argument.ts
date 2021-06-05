import RequiredArgumentError from "../errors/error-objects/required-argument-error";

export function requiredArgument(argument: string): never {
    throw new RequiredArgumentError(argument);
}