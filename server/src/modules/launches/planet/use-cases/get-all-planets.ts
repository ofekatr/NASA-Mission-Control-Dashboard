import planetRepoFactory from "@planet/planet.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createGetAllPlanets(
    {
        planetRepo: { dbGetAll } = planetRepoFactory(),
    } = {}
) {
    return async function getAllPlanets() {
        return await dbGetAll();
    }
}

const getAllPlanetsFactory = createSingletonFactory(createGetAllPlanets);

export default getAllPlanetsFactory;