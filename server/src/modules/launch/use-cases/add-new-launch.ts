import { createEntityForNewLaunch } from "@launch/domain/launch";
import { CreateLaunchParams } from "@launch/launch.defs";
import createLaunchRepo from "@launch/launch.repo";

function createAddNewLaunch(
    {
        launchRepo = createLaunchRepo(),
        createLaunch = createEntityForNewLaunch,
    } = {}
) {
    return async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = createLaunch(launchInfo);
        return await launchRepo.saveLaunch(launch);
    }
}

export default createAddNewLaunch;