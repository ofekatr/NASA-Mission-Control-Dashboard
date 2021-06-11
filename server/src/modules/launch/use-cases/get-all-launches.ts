import getLaunchRepoInstance from "@launch/launch.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createGetAllLaunchesInstance(
    {
        launchRepo = getLaunchRepoInstance(),
    } = {},
) {
    async function getAllLaunches() {
        return await launchRepo.getAllLaunches();
    }

    return getAllLaunches;
}

const getGetAllLaunchesInstance = singletonify(createGetAllLaunchesInstance);

export default getGetAllLaunchesInstance;