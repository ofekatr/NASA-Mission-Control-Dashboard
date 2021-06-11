import launchRepoFactory from "@launch/launch.repo";
import { singletonify } from "@shared/utils/singleton.utils";
import notFound from "@shared/validators/not-found";

function createAbortLaunch(
    {
        launchRepo = launchRepoFactory(),
    } = {}
) {
    return async function abortLaunch(flightNumber: number) {
        (await launchRepo.verifyLaunchExists(flightNumber)) ??
            notFound(`Launch flight number: ${flightNumber}`);

        let launch = await launchRepo.getLaunchByFlightNumber(flightNumber);
        launch.abortLaunch();
        await launchRepo.saveLaunch(launch);
    }
}

const abortLaunchFactory = singletonify(createAbortLaunch);

export default abortLaunchFactory;
