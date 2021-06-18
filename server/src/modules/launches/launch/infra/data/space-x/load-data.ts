import { createSingletonFactory } from '@shared/utils/singleton.utils';
import spaceXClientFactory from '@launch/infra/data/space-x/client';

function createLoadSpaceXLaunches(
    {
        spaceXClient: { queryLaunches } = spaceXClientFactory(),
    } = {}
) {
    return async function loadSpaceXLaunches() {
        await queryLaunches({
            options: {
                populate: [
                    {
                        path: 'rocket',
                        select: {
                            name: 1,
                        }
                    }
                ]
            },
        })
    }
}

const loadSpaceXLaunchesFactory = createSingletonFactory(createLoadSpaceXLaunches);

export default loadSpaceXLaunchesFactory;