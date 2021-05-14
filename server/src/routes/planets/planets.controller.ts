import { PlanetsService } from "./planets.service";

function createPlanetsController(planetsService: PlanetsService) {
    function getPlanets(): string {
        return planetsService.getPlanets();
    }

    return {
        getPlanets,
    };
}

export type PlanetsController = ReturnType<typeof createPlanetsController>;
export default createPlanetsController;