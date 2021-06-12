import loadKeplerPlanetsFactory from "@planet/infra/data/kepler/load-kepler";
import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadAndSavePlanets(
    {
        loadKeplerPlanets = loadKeplerPlanetsFactory(),
        planetRepo: { dbSavePlanets } = planetRepoFactory(),
    } = {}
) {
    return async function loadPlanets() {
        const planets = await loadKeplerPlanets();
        await dbSavePlanets(planets);
    }

}

const loadAndSavePlanetsFactory = createSingletonFactory(createLoadAndSavePlanets);

export default loadAndSavePlanetsFactory;