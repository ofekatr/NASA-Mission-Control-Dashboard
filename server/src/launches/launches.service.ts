import { createEntityForNewLaunch } from "@launches/launch.entity";
import { CreateLaunchParams } from "@definitions/launches.defs";
import CustomError from "@helpers/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import createLaunchesDal from "@launches/launches.dal";


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