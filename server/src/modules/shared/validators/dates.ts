import CustomError from '@shared/errors/error-objects/custom-error';
import { isNumber } from '@shared/utils/number.utils';


function assertDateInput(dateInput: string | number | Date) {
    if (!validateDateInput(dateInput)) {
        throw new CustomError('invalidDateInput', dateInput);
    }
}

function validateDateInput(dateInput: string | number | Date) {
    if (dateInput instanceof Date)
        return true;
    switch (typeof dateInput) {
        case 'string':
            return validateDateString(dateInput);
        case 'number':
            return validateDateNumber(dateInput);
        default:
            return false;
    }
}

function validateDateString(dateStr: string) {
    const date = new Date(dateStr);
    return date.toString() !== 'Invalid Date';
}

function validateDateNumber(dateNum: number) {
    const date = new Date(dateNum);
    return isNumber(date.valueOf());
}

const dateHelpers = {
    validateDateInput,
    validateDateNumber,
    validateDateString,
}

export default dateHelpers;

export {
    validateDateInput,
    validateDateNumber,
    validateDateString,
    assertDateInput,
};

