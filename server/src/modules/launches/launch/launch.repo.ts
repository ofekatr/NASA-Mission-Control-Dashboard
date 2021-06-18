import { getRepository } from '@core/infra/data/db';
import Launch from '@launch/domain/models/launch';
import ILaunchMongoDto from '@launch/infra/data/db/mongo/launch.dto';
import { mapDomainToMongoDtoFactory, mapMongoDtoToDomainFactory } from '@launch/infra/data/db/mongo/launch.mapper';
import { deepFreezeAndSeal } from '@shared/utils/object.utils';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import notFound from '@shared/validators/not-found';
import { requiredArgument } from '@shared/validators/required-argument';
import assert from 'assert';
import { Collection } from 'mongodb';

function createLaunchRepo({
    db = getRepository('launches') as Collection<ILaunchMongoDto>,
    mapMongoDtoToDomain = mapMongoDtoToDomainFactory(),
    mapDomainToMongoDto = mapDomainToMongoDtoFactory(),
} = {}) {
    async function dbGetAll(): Promise<Launch[]> {
        return await Promise.all(
            await db
                .find()
                .map(
                    async (dbLaunch) => await mapMongoDtoToDomain(dbLaunch)
                )
                .toArray()
        );
    }

    async function dbGet(
        flightNumber: string = requiredArgument('flightNumber')
    ): Promise<Launch> {
        const dbLaunch = (
            await db.findOne(
                {
                    flightNumber
                },
            )
        ) ?? notFound(`Launch flight number: ${flightNumber}`);

        return await mapMongoDtoToDomain(dbLaunch);
    }

    async function dbCheckExists(
        flightNumber: string = requiredArgument('flightNumber')
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

    async function dbSave(launch: Launch) {
        const dbLaunch = mapDomainToMongoDto(launch);
        const { result } = await db.updateOne(
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

        assert(result.ok === 1 && result.nModified === 1,
            `Flight Number: ${launch.flightNumber} - Failed to save launch`);
    }

    return deepFreezeAndSeal({
        dbSave,
        dbGetAll,
        dbGet,
        dbCheckExists,
    });
}

const launchRepoFactory = createSingletonFactory(createLaunchRepo);

export default launchRepoFactory;