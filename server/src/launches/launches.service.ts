import { CreateLaunchesServiceParams } from "@definitions/launches";
import { deepFreezeAndSeal } from "@helpers/object.helper";

function createLaunchesService({ launchesDal }: CreateLaunchesServiceParams) {

    function getAllLaunches() {
        return launchesDal.getAllLaunches();
    }

    return deepFreezeAndSeal({
        getAllLaunches,
    });
}

export default createLaunchesService;