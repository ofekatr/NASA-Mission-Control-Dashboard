import loadKeplerPlanetsFactory from "@planet/infra/data/kepler/load-kepler";
import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadAndSavePlanets(
    {
        loadKeplerPlanets = loadKeplerPlanetsFactory(),
        planetRepo: { dbSaveAll } = planetRepoFactory(),
    } = {}
) {
    return async function loadPlanets() {
        const planets = await loadKeplerPlanets();
        await dbSaveAll(planets);
    }

}

const loadAndSavePlanetsFactory = createSingletonFactory(createLoadAndSavePlanets);

export default loadAndSavePlanetsFactory;