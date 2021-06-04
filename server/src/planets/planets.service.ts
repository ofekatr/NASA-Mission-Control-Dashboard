import { PlanetsModel } from "@definitions/planets";

function createPlanetService(planetsModel: PlanetsModel){
    function getAllPlanets() {
        return planetsModel.getAllPlanets();
    }
    
    return {
        getAllPlanets,
    }
}

export default createPlanetService;