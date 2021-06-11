import launchRepoFactory from "@launch/launch.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createGetAllLaunches(
    {
        launchRepo = launchRepoFactory(),
    } = {},
) {
    async function getAllLaunches() {
        return await launchRepo.getAllLaunches();
    }

    return getAllLaunches;
}

const getAllLaunchesFactory = singletonify(createGetAllLaunches);

export default getAllLaunchesFactory;