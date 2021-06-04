import { RequiredArgumentError } from "../errors/required-argument/required-argument-error";

export function requiredArgument(argument: string): never {
    throw new RequiredArgumentError(argument);
}