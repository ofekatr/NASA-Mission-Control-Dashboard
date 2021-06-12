import { getRepository } from "@core/infra/data/db/typeorm";
import Planet from "@planet/domain/models/planet";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createPlanetRepo(
    {
        db = getRepository(Planet),
    } = {}
) {
    async function dbGetAllPlanets() {
        return await db.find();
    }

    async function dbSavePlanets(planets: Planet[]) {
        await db.save(planets);
    }

    async function dbUpsertPlanet(planet: Planet) {
        await db.updateOne(
            {
                keplerName: planet.keplerName,
            },
            {
                keplerName: planet.keplerName,
            },
            {
                upsert: true,
            },
        );
}

async function dbUpsertPlanets(planets: Planet[]) {
    await Promise.all(
        planets.map(
            async (planet) => await dbUpsertPlanet(planet),
        )
    );
}

return deepFreezeAndSeal({
    dbGetAllPlanets,
    dbSavePlanets,
    dbUpsertPlanet,
    dbUpsertPlanets,
})
}

const planetRepoFactory = createSingletonFactory(createPlanetRepo);

export default planetRepoFactory;