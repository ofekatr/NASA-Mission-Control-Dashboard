import { PlanetsDal } from "@planets/planets.defs";


const planetsDalMock: PlanetsDal = {
    getAllPlanets: () => ["Planet1", "Planet2", "Planet3"] as any,
};

export default planetsDalMock;