import { PlanetsModel } from "@planets/planets.model";

function createPlanetService(planetsModel: PlanetsModel){
    function getAllPlanets() {
        return planetsModel.getAllPlanets();
    }
    
    return {
        getAllPlanets,
    }
}

export type PlanetsService = ReturnType<typeof createPlanetService>;
export default createPlanetService;