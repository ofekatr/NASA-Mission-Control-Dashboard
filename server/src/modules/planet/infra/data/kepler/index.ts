import loadKeplerPlanetsFactory from "@planet/infra/data/kepler/kepler.loader";
import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadAndSavePlanets(
    {
        loadKeplerPlanets = loadKeplerPlanetsFactory(),
        planetRepo: { dbUpsertPlanets } = planetRepoFactory(),
    } = {}
) {
    return async function loadPlanets() {
        const planets = await loadKeplerPlanets();
        await dbUpsertPlanets(planets);
    }

}

const loadAndSavePlanetsFactory = createSingletonFactory(createLoadAndSavePlanets);

export default loadAndSavePlanetsFactory;