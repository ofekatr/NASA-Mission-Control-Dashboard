import Launch from '@launch/domain/models/launch';
import createFlightNumberFactory from '@launch/domain/values/flight-number';
import createLaunchDateFactory from '@launch/domain/values/launch-date';
import createTargetFactory from '@launch/domain/values/target';
import { IAddNewLaunchDto } from '@launch/use-cases/add-new-launch/add-new-launch.dto';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { requiredArgument } from '@shared/validators/required-argument';

function createMapAddNewLaunchDtoToDomain(
    {
        createFlightNumber = createFlightNumberFactory(),
        createLaunchDate = createLaunchDateFactory(),
        createTarget = createTargetFactory(),
        scheduleLaunch = Launch.schedule,
    } = {}
) {
    return async function mapAddNewLaunchDtoToDomain(
        {
            launchDate = requiredArgument('launchDate'),
            mission = requiredArgument('mission'),
            rocket = requiredArgument('rocket'),
            target = requiredArgument('target'),
        }: IAddNewLaunchDto = requiredArgument('addNewLaunchDto'),
    ): Promise<Launch> {
        const flightNumberValue = createFlightNumber();
        const launchDateValue = createLaunchDate(launchDate);
        const targetValue = await createTarget({ target, upcoming: true });

        return scheduleLaunch({
            flightNumber: flightNumberValue,
            launchDate: launchDateValue,
            target: targetValue!,
            mission,
            rocket,
        })
    }

}

const mapAddNewLaunchDtoToDomainFactory = createSingletonFactory(createMapAddNewLaunchDtoToDomain);

export { mapAddNewLaunchDtoToDomainFactory };

