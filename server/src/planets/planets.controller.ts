import { PlanetsService } from "@definitions/planets";

interface CreatePlanetsControllerParams {
    planetsService: PlanetsService
}

function createPlanetsController({ planetsService }: CreatePlanetsControllerParams) {
    function getAllPlanets() {
        return planetsService.getAllPlanets();
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsController = ReturnType<typeof createPlanetsController>;
export default createPlanetsController;