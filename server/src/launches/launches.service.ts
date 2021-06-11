import { createEntityForNewLaunch } from "@launches/domain/launch";
import { CreateLaunchParams } from "@launches/launches.defs";
import createLaunchesDal from "@launches/launches.repo";
import CustomError from "@shared/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";

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