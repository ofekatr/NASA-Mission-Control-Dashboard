import { createInvalidNumberError } from "@helpers/errors/error-objects/custom-error";

function assertNumber(val: any): asserts val is number {
    if (!isNumber(val)) {
        throw createInvalidNumberError(val);
    }
}

function isNumber(val: any) {
    return !isNaN(val);
}

const numberHelpers = {
    isNumber,
}

export default numberHelpers;

export {
    isNumber,
    assertNumber,
}