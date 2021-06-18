import launchRepoFactory from "@launch/launch.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import notFound from "@shared/validators/not-found";

function createAbortLaunch(
    {
        launchRepo = launchRepoFactory(),
    } = {}
) {
    return async function abortLaunch(flightNumber: string) {
        const isExists = await launchRepo.dbCheckExists(flightNumber);
        if (!isExists)
            notFound(`Launch flight number: ${flightNumber}`);
        let launch = await launchRepo.dbGet(flightNumber);
        launch.abortLaunch();
        await launchRepo.dbSave(launch);
    }
}

const abortLaunchFactory = createSingletonFactory(createAbortLaunch);

export default abortLaunchFactory;
