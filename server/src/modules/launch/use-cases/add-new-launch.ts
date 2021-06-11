import { createEntityForNewLaunch } from "@launch/domain/launch";
import { CreateLaunchParams } from "@launch/launch.defs";
import getLaunchRepoInstance from "@launch/launch.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createAddNewLaunchInstance(
    {
        launchRepo = getLaunchRepoInstance(),
        createLaunch = createEntityForNewLaunch,
    } = {}
) {
    return async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = createLaunch(launchInfo);
        return await launchRepo.saveLaunch(launch);
    }
}

const getAddNewLaunchInstance = singletonify(createAddNewLaunchInstance);

export default getAddNewLaunchInstance;