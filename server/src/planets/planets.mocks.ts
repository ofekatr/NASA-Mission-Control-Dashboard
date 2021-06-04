import { PlanetsModel } from "@root/planets/planets.dal";

const planetsModelMock: PlanetsModel = {
    getAllPlanets: () => ["Planet1", "Planet2", "Planet3"],
};

export default planetsModelMock;