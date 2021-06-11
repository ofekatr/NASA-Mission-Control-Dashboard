import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createGetAllPlanets(
    {
        planetRepo: { dbGetAllPlanets } = planetRepoFactory(),
    } = {}
) {
    return function getAllPlanets() {
        return dbGetAllPlanets();
    }
}

const getAllPlanetsFactory = createSingletonFactory(createGetAllPlanets);

export default getAllPlanetsFactory;