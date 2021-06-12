import { loadPlanetDataFactory } from "@planet";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadModuleData(
    {
        loadPlanetData = loadPlanetDataFactory(),
    } = {}
) {
    return async function loadModulesData() {
        await loadPlanetData();
    }
}

const loadModuleDataFactory = createSingletonFactory(createLoadModuleData);

export default loadModuleDataFactory;
