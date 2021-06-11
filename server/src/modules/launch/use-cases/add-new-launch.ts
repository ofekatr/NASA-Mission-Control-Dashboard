import { CreateLaunchProps } from "@launch/launch.defs";
import launchRepoFactory from "@launch/launch.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import Launch from "@launch/domain/launch";

function createAddNewLaunch(
    {
        launchRepo = launchRepoFactory(),
        createLaunch = Launch.createLaunch,
    } = {}
) {
    return async function addNewLaunch(launchInfo: CreateLaunchProps) {
        const launch = createLaunch(launchInfo);
        return await launchRepo.saveLaunch(launch);
    }
}

const addNewLaunchFactory = createSingletonFactory(createAddNewLaunch);

export default addNewLaunchFactory;
