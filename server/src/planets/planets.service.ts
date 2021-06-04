import { PlanetsModel } from "@root/planets/planets.dal";

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