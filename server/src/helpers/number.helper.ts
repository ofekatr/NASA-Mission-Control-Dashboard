function isNumber(val: any) {
    return !isNaN(val);
}

const numberHelpers = {
    isNumber,
}

export default numberHelpers;

export {
    isNumber
}