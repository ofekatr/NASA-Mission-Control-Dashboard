import createLaunchesDal from "@app/launches/launches.dal";
import { CreateLaunchParams } from "@app/launches/launches.defs";
import CustomError from "@app/shared/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@app/shared/utils/object.utils";
import { createEntityForNewLaunch } from "@domain/launch";



function createLaunchesService({
    launchesDal = createLaunchesDal(),
    createLaunch = createEntityForNewLaunch,
} = {}) {

    async function getAllLaunches() {
        return await launchesDal.getAllLaunches();
    }

    async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = createLaunch(launchInfo);
        return await launchesDal.saveLaunch(launch);
    }

    async function abortLaunch(flightNumber: number) {
        if (!(await launchesDal.verifyLaunchExists(flightNumber))) {
            throw new CustomError("notFound");
        }

        let launch = await launchesDal.getLaunchByFlightNumber(flightNumber);
        launch.abortLaunch();
        launchesDal.saveLaunch(launch);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        addNewLaunch,
        abortLaunch,
    });
}

export default createLaunchesService;