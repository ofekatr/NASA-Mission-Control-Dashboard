import { CreatePlanetsDalRequestParams, Planet } from '@definitions/planets.defs';
import { deepFreezeAndSeal } from '@helpers/object.helper';
import { requiredArgument } from '@helpers/validators/required-argument';
import createPlanetsLoader from '@loaders/planets';

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