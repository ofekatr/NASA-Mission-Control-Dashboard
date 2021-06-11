import { BasicObject } from "@app/shared/definitions/general.defs";

function checkIfObjectHasNullProperties(object: BasicObject): boolean {
    return [...Object.values(object)].some(value => value == null);
}

function freezeAndSeal<T extends BasicObject>(obj: T) {
    return Object.freeze(Object.seal(obj));
}

function deepFreezeAndSeal<T extends BasicObject>(obj: T) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            deepFreezeAndSeal(obj[key]);
        }
    }

    return freezeAndSeal(obj);
}

const objectUtils = {
    freezeAndSeal,
    deepFreezeAndSeal,
    checkIfObjectHasNullProperties,
}

export {
    freezeAndSeal,
    deepFreezeAndSeal,
    checkIfObjectHasNullProperties,
};

export default objectUtils;