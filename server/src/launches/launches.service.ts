import { CreateLaunchesServiceParams, CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesService({ launchesDal = requiredArgument("launchesDal") }: CreateLaunchesServiceParams) {

    function getAllLaunches() {
        return launchesDal.getAllLaunches();
    }

    function createLaunch(launchInfo: CreateLaunchInfo) {
        return launchesDal.createLaunch(launchInfo);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        createLaunch,
    });
}

export default createLaunchesService;