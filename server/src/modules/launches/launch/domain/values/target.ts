import planetRepoFactory from "@planet/planet.repo";
import CustomError from "@shared/errors/error-objects/custom-error";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";

function createCreateTarget(
    {
        planetRepo = planetRepoFactory(),
    } = {}
) {
    return async function createTarget(
        target: string = requiredArgument("target")
    ): Promise<string> {
        const isTargetPlanetExists =
            await planetRepo.dbVerifyPlanetExistsByKeplerName(target);
        if (!isTargetPlanetExists)
            throw new CustomError("invalidPlanet", target);
        return target;
    }

}

const createTargetFactory = createSingletonFactory(createCreateTarget);

export default createTargetFactory;