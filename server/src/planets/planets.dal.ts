
import createPlanetsLoader from "@planets/infra/data/kepler/kepler.loader";
import { Planet } from "@planets/planets.defs";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";

async function createPlanetsDal() {
    const planets: Planet[] = [];
    const loadHabitablePlanets = createPlanetsLoader();
    await loadHabitablePlanets(planets);

    function getAllPlanets() {
        return planets;
    }

    return deepFreezeAndSeal({
        getAllPlanets,
    });
}

export default createPlanetsDal;