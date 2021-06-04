import { CreatePlanetsServiceParams } from "@definitions/planets";

function createPlanetService({ planetsDal }: CreatePlanetsServiceParams) {
    function getAllPlanets() {
        return planetsDal.getAllPlanets();
    }

    return {
        getAllPlanets,
    }
}

export default createPlanetService;