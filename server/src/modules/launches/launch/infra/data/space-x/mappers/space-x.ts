import Launch from '@launch/domain/models/launch';
import createFlightNumberFactory from '@launch/domain/values/flight-number';
import createLaunchDateFactory from '@launch/domain/values/launch-date';
import { extractProperties } from '@shared/utils/object.utils';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
// import LaunchDep from '@launch/domain/models/launch';
import ISpaceXDto from '../dtos/space-x.dto';

function createSpaceXDtoToDomain(
    {
        createFlightNumber = createFlightNumberFactory(),
        createLaunchDate = createLaunchDateFactory(),
        // createTarget = createTargetFactory(),
        Launch: { create: createLaunch } = Launch,
    } = {}
) {
    return function spaceXDtoToDomain(dto: ISpaceXDto) {
        const {
            date_local,
            flight_number,
            name,
            payloads,
            rocket,
            success,
            upcoming
        } = extractProperties(
            dto,
            [
                'date_local',
                'flight_number',
                'name',
                'payloads',
                'rocket',
                'success',
                'upcoming',
            ],
        );

        return createLaunch({
            flightNumber: createFlightNumber(flight_number),
            launchDate: createLaunchDate(date_local),
            mission: name,
            rocket: rocket.name,
            success,
            upcoming,
            target: 'asasd',
            customers: payloads?.flatMap((payload) => payload.customers),
        })

    }

}

const spaceXDtoToDomainFactory = createSingletonFactory(createSpaceXDtoToDomain);

export default spaceXDtoToDomainFactory;