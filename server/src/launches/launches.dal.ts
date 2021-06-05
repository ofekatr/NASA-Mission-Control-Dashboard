import { CreateLaunchesDalParams, Launch } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesDal({ }: CreateLaunchesDalParams = requiredArgument("createLaunchesDalParams")) {
    const launches: Launch[] = [];

    function getAllLaunches() {
        return launches.filter(launch => !!launch);
    }

    function verifyLaunchExists(flightNumber: number = requiredArgument("flightNumber")) {
        return !!launches[flightNumber];
    }

    function getLaunchByFlightNumber(flightNumber: number = requiredArgument("flightNumber")) {
        return launches[flightNumber];
    }

    function addLaunch(launch: Launch = requiredArgument("launch")) {
        launches[launch.flightNumber] = launch;
        return true;
    }

    return deepFreezeAndSeal({
        getAllLaunches,
        addLaunch,
        getLaunchByFlightNumber,
        verifyLaunchExists,
    });
}

export default createLaunchesDal;