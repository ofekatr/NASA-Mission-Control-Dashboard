import loadSpaceXLaunchesFactory from '@launch/infra/data/space-x/load-data';
import { createSingletonFactory } from '@shared/utils/singleton.utils';

function createLoadLaunchModuleData(
    {
        loadSpaceXLaunches = loadSpaceXLaunchesFactory()
    } = {}
) {
    return async function loadLaunchData() {
        await loadSpaceXLaunches();
    }

}

const loadLaunchModuleDataFactory = createSingletonFactory(createLoadLaunchModuleData);

export default loadLaunchModuleDataFactory;