import { PlanetsModel } from "../../models/planets.model";

function createPlanetsService(planetsModel: PlanetsModel) {
    function getAllPlanets(): PlanetsModel {
        return planetsModel;
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsService = ReturnType<typeof createPlanetsService>;
export default createPlanetsService;