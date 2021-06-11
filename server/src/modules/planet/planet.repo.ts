
import { getPlanets } from "@planet/infra/data/kepler";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { singletonify } from "@shared/utils/singleton.utils";

function createPlanetRepo() {
    function getAllPlanet() {
        return getPlanets();
    }

    return deepFreezeAndSeal({
        getAllPlanet,
    });
}

const planetRepoFactory = singletonify(createPlanetRepo);

export default planetRepoFactory;
