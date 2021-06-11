import getPlanetRepoInstance from "@planet/planet.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createPlanetService({ planetRepo = getPlanetRepoInstance() } = {}) {
    function getAllPlanet() {
        return planetRepo.getAllPlanet();
    }

    return {
        getAllPlanet,
    }
}

const getPlanetServiceInstance = singletonify(createPlanetService);

export default getPlanetServiceInstance;