import { deepFreezeAndSeal } from "@helpers/object.helper";

type UnionElementsType = string | number;

function createUnion<T extends UnionElementsType>(...values: T[]) {
    function compare(value: any, unionElement: T) {
        return value === unionElement
    }

    const unionNamespace = {
        values: deepFreezeAndSeal(values),
        compare,
    };

    return unionNamespace as typeof unionNamespace & { type: T };
}

const unionHelpers = {
    createUnion,
}
export default unionHelpers;
export {
    createUnion,
}