import launchRepoFactory from "@launch/launch.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createGetAllLaunches(
    {
        launchRepo = launchRepoFactory(),
    } = {},
) {
    async function getAllLaunches() {
        return await launchRepo.dbGetAllLaunches();
    }

    return getAllLaunches;
}

const getAllLaunchesFactory = createSingletonFactory(createGetAllLaunches);

export default getAllLaunchesFactory;