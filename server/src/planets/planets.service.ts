import { PlanetsDal } from "@definitions/planets";

interface CreatePlanetsServiceParams {
    planetsDal: PlanetsDal;
}

function createPlanetService({ planetsDal }: CreatePlanetsServiceParams) {
    function getAllPlanets() {
        return planetsDal.getAllPlanets();
    }

    return {
        getAllPlanets,
    }
}

export default createPlanetService;