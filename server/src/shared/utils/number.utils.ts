import CustomError from "@shared/errors/error-objects/custom-error";


function assertNumber(val: any): asserts val is number {
    if (!isNumber(val)) {
        throw new CustomError("invalidNumber", val);
    }
}

function isNumber(val: any) {
    return !isNaN(val);
}

const numberUtils = {
    isNumber,
}

export default numberUtils;

export {
    isNumber,
    assertNumber,
};
