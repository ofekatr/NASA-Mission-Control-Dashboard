import { createEntityForNewLaunch } from "@launch/domain/launch";
import { CreateLaunchParams } from "@launch/launch.defs";
import launchRepoFactory from "@launch/launch.repo";
import { singletonify } from "@shared/utils/singleton.utils";

function createAddNewLaunch(
    {
        launchRepo = launchRepoFactory(),
        createLaunch = createEntityForNewLaunch,
    } = {}
) {
    return async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = createLaunch(launchInfo);
        return await launchRepo.saveLaunch(launch);
    }
}

const addNewLaunchFactory = singletonify(createAddNewLaunch);

export default addNewLaunchFactory;
