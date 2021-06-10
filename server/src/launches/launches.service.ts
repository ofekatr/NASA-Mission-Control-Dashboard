import { CreateLaunchesServiceParams, CreateLaunchParams } from "@definitions/launches.defs";
import CustomError from "@helpers/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import createLaunchesDal from "@launches/launches.dal";
import createLaunchesModel from "@launches/launch.entity";


function createLaunchesService({
    launchesModel = createLaunchesModel(),
    launchesDal = createLaunchesDal()
}) {

    async function getAllLaunches() {
        return await launchesDal.getAllLaunches();
    }

    async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = launchesModel.createLaunch(launchInfo);
        return await launchesDal.saveLaunch(launch);
    }

    async function abortLaunch(flightNumber: number) {
        if (!(await launchesDal.verifyLaunchExists(flightNumber))) {
            throw new CustomError("notFound");
        }

        let launch = await launchesDal.getLaunchByFlightNumber(flightNumber);
        launch = launchesModel.abortLaunch(launch);
        launchesDal.saveLaunch(launch);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        addNewLaunch,
        abortLaunch,
    });
}

export default createLaunchesService;