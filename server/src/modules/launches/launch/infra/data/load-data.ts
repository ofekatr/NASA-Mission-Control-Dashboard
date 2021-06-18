import loadSpaceXLaunchesFactory from '@launch/infra/data/space-x/load-data';
import launchRepoFactory from '@launch/launch.repo';
import { createSingletonFactory } from '@shared/utils/singleton.utils';

function createLoadLaunchModuleData(
    {
        loadSpaceXLaunches = loadSpaceXLaunchesFactory(),
        launchRepo: { dbSaveAll } = launchRepoFactory(),
    } = {}
) {
    return async function loadLaunchData() {
        const launches = await loadSpaceXLaunches();
        await dbSaveAll(launches);
    }

}

const loadLaunchModuleDataFactory = createSingletonFactory(createLoadLaunchModuleData);

export default loadLaunchModuleDataFactory;