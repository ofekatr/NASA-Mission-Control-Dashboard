import { PlanetDal } from "planet/planet.defs";


const planetRepoMock: PlanetDal = {
    getAllPlanet: () => ["Planet1", "Planet2", "Planet3"] as any,
};

export default planetRepoMock;