import { CreatePlanetsDalRequestParams, Planet } from "@app/planets/planets.defs";
import { deepFreezeAndSeal } from "@app/shared/utils/object.utils";
import { requiredArgument } from "@app/shared/validators/required-argument";
import createPlanetsLoader from "@infra/loaders/planets";


async function createPlanetsDal({
    planetsModel = requiredArgument("planetsModel"), parse = requiredArgument("parse"), fs = requiredArgument("fs"), path = requiredArgument("path")
}: CreatePlanetsDalRequestParams) {
    const planets: Planet[] = [];
    const loadHabitablePlanets = createPlanetsLoader({
        fs,
        path,
        parse,
        createPlanet: planetsModel.createPlanet,
        verifyValidPlanet: planetsModel.verifyHabitablePlanet,
    });
    await loadHabitablePlanets(planets);

    function getAllPlanets() {
        return planets;
    }

    return deepFreezeAndSeal({
        getAllPlanets,
    });
}

export default createPlanetsDal;