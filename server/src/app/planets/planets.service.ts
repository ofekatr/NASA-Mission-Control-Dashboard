import { CreatePlanetsServiceParams } from "@app/planets/planets.defs";


function createPlanetService({ planetsDal }: CreatePlanetsServiceParams) {
    function getAllPlanets() {
        return planetsDal.getAllPlanets();
    }

    return {
        getAllPlanets,
    }
}

export default createPlanetService;