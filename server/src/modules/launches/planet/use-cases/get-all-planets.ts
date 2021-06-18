import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createGetAllPlanets(
    {
        planetRepo: { dbGetAllPlanets } = planetRepoFactory(),
    } = {}
) {
    return async function getAllPlanets() {
        return await dbGetAllPlanets();
    }
}

const getAllPlanetsFactory = createSingletonFactory(createGetAllPlanets);

export default getAllPlanetsFactory;