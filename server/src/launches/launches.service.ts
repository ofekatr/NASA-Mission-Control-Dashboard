import { CreateLaunchesServiceParams, CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesService({ launchesModel = requiredArgument("launchesModel"), launchesDal = requiredArgument("launchesDal") }: CreateLaunchesServiceParams) {

    function getAllLaunches() {
        return launchesDal.getAllLaunches();
    }

    function createLaunch(launchInfo: CreateLaunchInfo) {
        const launch = launchesModel.createLaunch(launchInfo);
        return launchesDal.addLaunch(launch);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        createLaunch,
    });
}

export default createLaunchesService;