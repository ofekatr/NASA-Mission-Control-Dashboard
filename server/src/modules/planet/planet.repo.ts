import { getRepository } from "@core/infra/data/db/typeorm";
import Planet from "@planet/domain/planet";
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

    return deepFreezeAndSeal({
        dbGetAllPlanets,
        dbSavePlanets,
    })
}

const planetRepoFactory = createSingletonFactory(createPlanetRepo);

export default planetRepoFactory;