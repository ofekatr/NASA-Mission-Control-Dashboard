import Launch from '@launch/domain/models/launch';
import spaceXClientFactory from '@launch/infra/data/space-x/client';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { spaceXDtoToDomainFactory } from './mappers';

function createLoadSpaceXLaunches(
    {
        spaceXClient: { queryLaunches } = spaceXClientFactory(),
        spaceXDtoToDomain = spaceXDtoToDomainFactory(),
    } = {}
) {
    const QUERY_LAUNCH_PARAMS = {
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1,
                    }
                }
            ]
        },
    }

    return async function loadSpaceXLaunches(): Promise<Launch[]> {
        const data = (
            await queryLaunches(
                QUERY_LAUNCH_PARAMS
            )
        )?.data;

        return data?.docs?.map((launch: any) => spaceXDtoToDomain(launch));
    }
}

const loadSpaceXLaunchesFactory = createSingletonFactory(createLoadSpaceXLaunches);

export default loadSpaceXLaunchesFactory;