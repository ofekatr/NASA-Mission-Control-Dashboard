import { CreatePlanetsControllerParams } from "@definitions/planets";

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