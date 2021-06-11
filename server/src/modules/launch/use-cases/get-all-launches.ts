import launchRepoFactory from "@launch/launch.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createGetAllLaunches(
    {
        launchRepo = launchRepoFactory(),
    } = {},
) {
    async function getAllLaunches() {
        return (await launchRepo.getAllLaunches()).map((launch) => ({
            ...launch,
            success: launch.getSuccess(),
            upcoming: launch.getUpcoming(),
        }));
    }

    return getAllLaunches;
}

const getAllLaunchesFactory = createSingletonFactory(createGetAllLaunches);

export default getAllLaunchesFactory;