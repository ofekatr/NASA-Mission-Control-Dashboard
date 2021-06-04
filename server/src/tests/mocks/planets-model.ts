import { PlanetsModel } from "@planets/planets.model";

const planetsModelMock: PlanetsModel = {
    getAllPlanets: () => ["Planet1", "Planet2", "Planet3"],
};

export default planetsModelMock;