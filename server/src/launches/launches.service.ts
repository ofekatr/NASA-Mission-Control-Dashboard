import { CreateLaunchesServiceParams } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesService({ launchesDal = requiredArgument("launchesDal") }: CreateLaunchesServiceParams) {

    function getAllLaunches() {
        return launchesDal.getAllLaunches();
    }

    return deepFreezeAndSeal({
        getAllLaunches,
    });
}

export default createLaunchesService;