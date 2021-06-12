import loadKeplerPlanetsFactory from "@planet/infra/data/kepler/kepler.loader";
import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadAndSavePlanets(
    {
        loadKeplerPlanets = loadKeplerPlanetsFactory(),
        planetRepo = planetRepoFactory(),
    } = {}
) {
    return async function loadPlanets() {
        const planets = await loadKeplerPlanets();
        await planetRepo.dbSavePlanets(planets);
    }

}

const loadAndSavePlanetsFactory = createSingletonFactory(createLoadAndSavePlanets);

export default loadAndSavePlanetsFactory;