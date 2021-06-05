import { CreateLaunchesDalParams, CreateLaunchInfo, Launch } from "@definitions/launches.defs";
import handleError from "@helpers/errors/error-handler";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesDal({ launchesModel = requiredArgument("launchesModel") }: CreateLaunchesDalParams) {
    const launches: Launch[] = [];

    function getAllLaunches() {
        return launches.filter(launch => !!launch);
    }

    function addLaunch(launchInfo: CreateLaunchInfo) {
        try {
            const launch = launchesModel.createLaunch(launchInfo);
            launches[launch.flightNumber] = launch;
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        createLaunch: addLaunch,
    });
}

export default createLaunchesDal;