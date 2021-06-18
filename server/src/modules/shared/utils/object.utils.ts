import { BasicObject } from '@shared/definitions/general';

function checkObjectHasNullProperties(object: BasicObject): boolean {
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

function extractProperties<T extends BasicObject, U extends keyof T>(
    obj: T,
    properties: U[]
) {
    const res: { [key in typeof properties[number]]: T[key] } = {} as { [key in typeof properties[number]]: T[key] };
    properties.forEach((property) => {
        res[property] = obj[property];
    });
    return res;
}

export {
    freezeAndSeal,
    deepFreezeAndSeal,
    checkObjectHasNullProperties,
    extractProperties,
};
