import planetRepoFactory from "@planet/planet.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createPlanetService({ planetRepo = planetRepoFactory() } = {}) {
    function getAllPlanet() {
        return planetRepo.getAllPlanet();
    }

    return {
        getAllPlanet,
    }
}

const planetServiceFactory = singletonify(createPlanetService);

export default planetServiceFactory;
