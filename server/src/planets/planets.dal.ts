import createPlanetsLoader from "@core/infra/data/kepler/kepler.loader";
import { CreatePlanetsDalRequestParams, Planet } from "@planets/planets.defs";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { requiredArgument } from "@shared/validators/required-argument";

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