import { PlanetsDal } from "@definitions/planets.defs";

const planetsDalMock: PlanetsDal = {
    getAllPlanets: () => ["Planet1", "Planet2", "Planet3"] as any,
};

export default planetsDalMock;