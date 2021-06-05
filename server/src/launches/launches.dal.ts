import { CreateLaunchesDalParams, Launch } from "@definitions/launches.defs";
import handleError from "@helpers/errors/error-handler";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesDal({ }: CreateLaunchesDalParams = requiredArgument("createLaunchesDalParams")) {
    const launches: Launch[] = [];

    function getAllLaunches() {
        return launches.filter(launch => !!launch);
    }

    function addLaunch(launch: Launch = requiredArgument("launch")) {
        try {
            launches[launch.flightNumber] = launch;
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }

    function deleteLaunch(flightNumber: number = requiredArgument("flightNumber")) {
        try {
            delete launches[flightNumber];
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        addLaunch,
        deleteLaunch,
    });
}

export default createLaunchesDal;