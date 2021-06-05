import { CreatePlanetsServiceParams } from "@definitions/planets.defs";

function createPlanetService({ planetsDal }: CreatePlanetsServiceParams) {
    function getAllPlanets() {
        return planetsDal.getAllPlanets();
    }

    return {
        getAllPlanets,
    }
}

export default createPlanetService;