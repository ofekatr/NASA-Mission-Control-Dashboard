
import { getPlanets } from "@planet/infra/data/kepler";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { singletonify } from "@shared/utils/singleton.utils";

function createPlanetRepoInstance() {
    function getAllPlanet() {
        return getPlanets();
    }

    return deepFreezeAndSeal({
        getAllPlanet,
    });
}

const getPlanetRepoInstance = singletonify(createPlanetRepoInstance);

export default getPlanetRepoInstance;