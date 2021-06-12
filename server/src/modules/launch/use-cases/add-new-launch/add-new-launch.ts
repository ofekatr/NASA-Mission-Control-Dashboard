import Launch from "@launch/domain/models/launch";
import { AddNewLaunchDTO } from "@launch/launch.defs";
import launchRepoFactory from "@launch/launch.repo";
import { mapAddNewLaunchDtoToDomainFactory } from "@launch/use-cases/add-new-launch/launch.mapper";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createAddNewLaunch(
    {
        launchRepo = launchRepoFactory(),
        mapAddNewLaunchDtoToDomain = mapAddNewLaunchDtoToDomainFactory(),
    } = {}
) {
    return async function addNewLaunch(request: AddNewLaunchDTO) {
        const launch: Launch = await mapAddNewLaunchDtoToDomain(request);
        return await launchRepo.saveLaunch(launch);
    }
}

const addNewLaunchFactory = createSingletonFactory(createAddNewLaunch);

export default addNewLaunchFactory;
