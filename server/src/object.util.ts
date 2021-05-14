import { GeneralObject } from "./types/general";

function checkIfObjectHasNullProperties(object: GeneralObject): boolean {
    return [...Object.values(object)].some(value => value == null);
}

const objectUtils = {
    checkIfObjectHasNullProperties,
}

export {
    checkIfObjectHasNullProperties,
}

export default objectUtils;