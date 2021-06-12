import { getRepository } from "@core/infra/data/db";
import Planet from "@planet/domain/models/planet";
import IPlanetMongoDto from "@planet/infra/data/db/mongo/planet.dto";
import { mapDomainToMongoDtoFactory, mapMongoDtoToDomainFactory } from "@planet/infra/data/db/mongo/planet.mapper";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Collection } from "mongodb";

function createPlanetRepo(
    {
        db = getRepository("planets") as Collection<IPlanetMongoDto>,
        mapMongoDtoToDomain = mapMongoDtoToDomainFactory(),
        mapDomainToMongoDto = mapDomainToMongoDtoFactory(),
    } = {}
) {
    async function dbGetAllPlanets() {
        return await db
            .find()
            .map(
                (dbPlanet) => mapMongoDtoToDomain(dbPlanet)
            )
            .toArray();
    }

    async function dbSavePlanets(planets: Planet[]) {
        await Promise.all(
            planets.map(
                async (planet) => await dbSavePlanet(planet)
            )
        );
    }

    async function dbSavePlanet(planet: Planet) {
        const dbPlanet = mapDomainToMongoDto(planet);
        await db.updateOne(
            {
                keplerName: dbPlanet.keplerName,
            },
            {
                $set: { keplerName: dbPlanet.keplerName },
            },
            {
                upsert: true,
            },
        );
    }

    async function dbVerifyPlanetExistsByKeplerName(
        keplerName: string
    ) {
        return !!(
            await db.findOne(
                {
                    keplerName
                },
                {
                    projection: {
                        _id: 1
                    }
                }
            )
        );
    }

    return deepFreezeAndSeal({
        dbGetAllPlanets,
        dbSavePlanets,
        dbSavePlanet,
        dbVerifyPlanetExistsByKeplerName,
    })
}

const planetRepoFactory = createSingletonFactory(createPlanetRepo);

export default planetRepoFactory;