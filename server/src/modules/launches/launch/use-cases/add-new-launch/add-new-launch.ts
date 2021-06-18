import Launch from '@launch/domain/models/launch';
import { AddNewLaunchDTO } from '@launch/launch.defs';
import launchRepoFactory from '@launch/launch.repo';
import { mapAddNewLaunchDtoToDomainFactory } from '@launch/use-cases/add-new-launch/launch.mapper';
import planetRepoFactory from '@planet/planet.repo';
import CustomError from '@shared/errors/error-objects/custom-error';
import { createSingletonFactory } from '@shared/utils/singleton.utils';

function createAddNewLaunch(
    {
        launchRepo = launchRepoFactory(),
        planetRepo = planetRepoFactory(),
        mapAddNewLaunchDtoToDomain = mapAddNewLaunchDtoToDomainFactory(),
    } = {}
) {
    return async function addNewLaunch(request: AddNewLaunchDTO) {
        const isTargetPlanetExists = await planetRepo.dbCheckExists(request.target);
        if (!isTargetPlanetExists)
            throw new CustomError('invalidPlanet', 'Target planet does not exist.');
        const launch: Launch = await mapAddNewLaunchDtoToDomain(request);
        return await launchRepo.dbSave(launch);
    }
}

const addNewLaunchFactory = createSingletonFactory(createAddNewLaunch);

export default addNewLaunchFactory;
