import CustomError from "@shared/errors/error-objects/custom-error";

export default function notFound(value: any): never {
    throw new CustomError("notFound", value);
}