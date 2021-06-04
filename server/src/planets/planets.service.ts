import { PlanetsModel } from "@definitions/planets";

interface CreatePlanetsServiceParams {
    planetsDal: PlanetsModel;
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