import launchRepoFactory from '@launch/launch.repo';
import { createSingletonFactory } from '@shared/utils/singleton.utils';

function createGetAllLaunches(
    {
        launchRepo = launchRepoFactory(),
    } = {},
) {
    async function getAllLaunches({ page = 1, limit = 10 } = {}) {
        return await launchRepo.dbGetAll({ page, limit });
    }

    return getAllLaunches;
}

const getAllLaunchesFactory = createSingletonFactory(createGetAllLaunches);

export default getAllLaunchesFactory;