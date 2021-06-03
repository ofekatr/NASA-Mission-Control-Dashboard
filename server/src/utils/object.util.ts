import { BasicObject } from "@server-types/general";

function checkIfObjectHasNullProperties(object: BasicObject): boolean {
    return [...Object.values(object)].some(value => value == null);
}

const objectUtils = {
    checkIfObjectHasNullProperties,
}

export {
    checkIfObjectHasNullProperties,
}

export default objectUtils;