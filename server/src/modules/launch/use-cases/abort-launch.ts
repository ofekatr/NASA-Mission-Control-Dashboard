import createLaunchRepo from "@launch/launch.repo";
import notFound from "@shared/validators/not-found";

function createAbourtLaunch(
    {
        launchRepo = createLaunchRepo(),
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

export default createAbourtLaunch;