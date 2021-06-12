import { getRepository } from "@core/infra/data/db";
import Launch from "@launch/domain/models/launch";
import ILaunchMongoDto from "@launch/infra/data/db/mongo/launch.dto";
import { mapDomainToMongoDtoFactory, mapMongoDtoToDomainFactory } from "@launch/infra/data/db/mongo/launch.mapper";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import notFound from "@shared/validators/not-found";
import { requiredArgument } from "@shared/validators/required-argument";
import { Collection } from "mongodb";

function createLaunchRepo({
    db = getRepository("launches") as Collection<ILaunchMongoDto>,
    mapMongoDtoToDomain = mapMongoDtoToDomainFactory(),
    mapDomainToMongoDto = mapDomainToMongoDtoFactory(),
} = {}) {
    async function getAllLaunches(): Promise<Launch[]> {
        return await db
            .find()
            .map(
                (dbLaunch) => mapMongoDtoToDomain(dbLaunch)
            )
            .toArray();
    }

    async function getLaunchByFlightNumber(
        flightNumber: string = requiredArgument("flightNumber")
    ): Promise<Launch> {
        const dbLaunch = (
            await db.findOne(
                {
                    flightNumber
                },
            )
        ) ?? notFound(`Launch flight number: ${flightNumber}`);

        return mapMongoDtoToDomain(dbLaunch);
    }

    async function verifyLaunchExists(
        flightNumber: string = requiredArgument("flightNumber")
    ) {
        return !!(
            await db.findOne(
                { flightNumber },
                {
                    projection: {
                        _id: 1
                    }
                })
        );
    }

    async function saveLaunch(launch: Launch) {
        const dbLaunch = mapDomainToMongoDto(launch);
        await db.findOneAndUpdate(
            {
                flightNumber: dbLaunch.flightNumber
            },
            {
                $set: { ...dbLaunch },
            },
            {
                upsert: true,
            }
        );
    }

    return deepFreezeAndSeal({
        saveLaunch,
        getAllLaunches,
        getLaunchByFlightNumber,
        verifyLaunchExists,
    });
}

const launchRepoFactory = createSingletonFactory(createLaunchRepo);

export default launchRepoFactory;