import { CreateLaunchesServiceParams, CreateLaunchInfo } from "@definitions/launches.defs";
import CustomError from "@helpers/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesService({ launchesModel = requiredArgument("launchesModel"), launchesDal = requiredArgument("launchesDal") }: CreateLaunchesServiceParams) {

    function getAllLaunches() {
        return launchesDal.getAllLaunches();
    }

    function addNewLaunch(launchInfo: CreateLaunchInfo) {
        const launch = launchesModel.createLaunch(launchInfo);
        return launchesDal.addLaunch(launch);
    }

    function abortLaunch(flightNumber: number) {
        if (!launchesDal.verifyLaunchExists(flightNumber)) {
            throw new CustomError("notFound");
        }

        const launch = launchesDal.getLaunchByFlightNumber(flightNumber);
        launchesModel.abortLaunch(launch);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        addNewLaunch,
        abortLaunch,
    });
}

export default createLaunchesService;