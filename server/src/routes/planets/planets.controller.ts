import { PlanetsService } from "./planets.service";

function createPlanetsController(planetsService: PlanetsService) {
    function getAllPlanets() {
        return planetsService.getAllPlanets();
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsController = ReturnType<typeof createPlanetsController>;
export default createPlanetsController;