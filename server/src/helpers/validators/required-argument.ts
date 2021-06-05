import { createRequiredArgumentError } from "@helpers/errors/error-objects/custom-error";

export function requiredArgument(argument: string): never {
    throw createRequiredArgumentError(argument);
}