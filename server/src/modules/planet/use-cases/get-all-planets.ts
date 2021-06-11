import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { dbGetAllPlanets as dbGetAllPlanetsDep } from "@planet/repo";

function createGetAllPlanets(
    {
        dbGetAllPlanets = dbGetAllPlanetsDep,
    } = {}
) {
    return function getAllPlanets() {
        return dbGetAllPlanets();
    }
}

const getAllPlanetsFactory = createSingletonFactory(createGetAllPlanets);

export default getAllPlanetsFactory;