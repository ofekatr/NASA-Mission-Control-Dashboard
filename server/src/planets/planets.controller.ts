import { PlanetsService } from "@definitions/planets";

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