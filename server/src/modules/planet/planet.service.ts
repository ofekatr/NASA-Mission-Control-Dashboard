import createPlanetRepo from "@planet/planet.repo";

function createPlanetService({ planetRepo = createPlanetRepo() } = {}) {
    function getAllPlanet() {
        return planetRepo.getAllPlanet();
    }

    return {
        getAllPlanet,
    }
}

export default createPlanetService;