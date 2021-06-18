import Launch from '@launch/domain/models/launch';
import createFlightNumberFactory from '@launch/domain/values/flight-number';
import createLaunchDateFactory from '@launch/domain/values/launch-date';
import createTargetFactory from '@launch/domain/values/target';
import ILaunchMongoDto from '@launch/infra/data/db/mongo/launch.dto';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { requiredArgument } from '@shared/validators/required-argument';

function createMapDomainToMongoDto(
    {

    } = {}
) {
    return function mapDomainToMongoDto(
        {
            flightNumber = requiredArgument('flightNumber'),
            launchDate = requiredArgument('launchDate'),
            mission = requiredArgument('mission'),
            rocket = requiredArgument('rocket'),
            success = requiredArgument('success'),
            target = requiredArgument('target'),
            upcoming = requiredArgument('upcoming'),
            customers,
        }: Launch = requiredArgument('launch')
    ): ILaunchMongoDto {
        return {
            flightNumber,
            launchDate,
            mission,
            rocket,
            success,
            target,
            upcoming,
            customers,
        };
    }
}

const mapDomainToMongoDtoFactory = createSingletonFactory(createMapDomainToMongoDto);

function createMapMongoDtoToDomain(
    {
        createFlightNumber = createFlightNumberFactory(),
        createLaunchDate = createLaunchDateFactory(),
        createTarget = createTargetFactory(),
    } = {}
) {
    return async function mapMongoDtoToDomain(
        {
            flightNumber = requiredArgument('flightNumber'),
            launchDate = requiredArgument('launchDate'),
            mission = requiredArgument('mission'),
            rocket = requiredArgument('rocket'),
            success = requiredArgument('success'),
            target = requiredArgument('target'),
            upcoming = requiredArgument('upcoming'),
            customers,
        }: ILaunchMongoDto = requiredArgument('launchMongoDTO')
    ): Promise<Launch> {
        const flightNumberValue = createFlightNumber(flightNumber);
        const launchDateValue = createLaunchDate(launchDate);
        const targetValue = await createTarget(target);

        return Launch.createLaunch({
            flightNumber: flightNumberValue,
            launchDate: launchDateValue,
            target: targetValue,
            mission,
            rocket,
            success,
            upcoming,
            customers,
        });
    }

}

const mapMongoDtoToDomainFactory = createSingletonFactory(createMapMongoDtoToDomain);

export {
    mapMongoDtoToDomainFactory,
    mapDomainToMongoDtoFactory,
};

