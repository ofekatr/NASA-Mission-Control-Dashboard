import { getRepository } from "@core/infra/data/db";
import Planet from "@planet/domain/models/planet";
import IPlanetMongoDto from "@planet/infra/data/db/mongo/planet.dto";
import { mapDomainToMongoDtoFactory, mapMongoDtoToDomainFactory } from "@planet/infra/data/db/mongo/planet.mapper";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import notFound from "@shared/validators/not-found";
import { requiredArgument } from "@shared/validators/required-argument";
import assert from "assert";
import { Collection } from "mongodb";

function createPlanetRepo(
    {
        db = getRepository("planets") as Collection<IPlanetMongoDto>,
        mapMongoDtoToDomain = mapMongoDtoToDomainFactory(),
        mapDomainToMongoDto = mapDomainToMongoDtoFactory(),
    } = {}
) {
    async function dbGetAll(): Promise<Planet[]> {
        return await db
            .find()
            .map(
                (dbPlanet) => mapMongoDtoToDomain(dbPlanet)
            )
            .toArray();
    }

    async function dbGet(
        keplerName: string = requiredArgument('keplerName')
    ): Promise<Planet> {
        const planet = (
            await db.findOne(
                {
                    keplerName,
                }
            )
        ) ?? notFound(`Planet Kepler Name: ${keplerName}`);

        return mapMongoDtoToDomain(planet);
    }

    async function dbSave(planet: Planet) {
        const dbPlanet = mapDomainToMongoDto(planet);
        const { result } = await db.updateOne(
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

        assert(
            result.nModified <= 1 && result.ok === 1,
            `Planet Kepler Name: ${planet.keplerName} - Failed to save`
        );
    }

    async function dbSaveAll(planets: Planet[]): Promise<void> {
        await Promise.all(
            planets.map(
                async (planet) => await dbSave(planet)
            )
        );
    }

    async function dbCheckExists(
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
        dbGet,
        dbGetAll,
        dbSave,
        dbSaveAll,
        dbCheckExists,
    })
}

const planetRepoFactory = createSingletonFactory(createPlanetRepo);

export default planetRepoFactory;