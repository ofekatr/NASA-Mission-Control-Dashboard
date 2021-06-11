
import { getPlanets } from "@planet/infra/data/kepler";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";

function createPlanetRepo() {
    function getAllPlanet() {
        return getPlanets();
    }

    return deepFreezeAndSeal({
        getAllPlanet,
    });
}

export default createPlanetRepo;