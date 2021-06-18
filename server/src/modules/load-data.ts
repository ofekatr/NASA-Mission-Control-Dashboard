import { loadPlanetModuleDataFactory } from "@planet";
import { loadLaunchDataFactory } from "@launch";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadModuleData(
    {
        loadPlanetData = loadPlanetModuleDataFactory(),
        loadLaunchData = loadLaunchDataFactory(),
    } = {}
) {
    return async function loadModulesData() {
        await Promise.all(
            [
                loadPlanetData(),
                loadLaunchData()
            ]
        );
    }
}

const loadModuleDataFactory = createSingletonFactory(createLoadModuleData);

export default loadModuleDataFactory;
