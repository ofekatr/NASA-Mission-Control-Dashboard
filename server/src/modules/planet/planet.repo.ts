import { getKeplerPlanets as getKeplerPlanetsDep } from "@planet/infra/data/kepler";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createPlanetRepo(
    {
        getKeplerPlanets = getKeplerPlanetsDep,
    } = {}
) {
    function dbGetAllPlanets() {
        return getKeplerPlanets();
    }

    return deepFreezeAndSeal({
        dbGetAllPlanets,
    })
}

const planetRepoFactory = createSingletonFactory(createPlanetRepo);

export default planetRepoFactory;