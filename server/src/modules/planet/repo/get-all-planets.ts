import { getKeplerPlanets as getKeplerPlanetsDep } from "@planet/infra/data/kepler";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createDbGetAllPlanets(
    {
        getKeplerPlanets = getKeplerPlanetsDep,
    } = {}
) {
    return function getAllPlanets() {
        return getKeplerPlanets();
    }
}

const dbGetAllPlanetsFactory = createSingletonFactory(createDbGetAllPlanets);

export default dbGetAllPlanetsFactory;