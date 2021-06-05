import { CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesModel() {
    let currentUid = 99;

    function createLaunch(launchInfo: CreateLaunchInfo = requiredArgument("launchInfo")) {
        validateLaunch(launchInfo);
        const launch = normalizeLaunch(launchInfo);
        return deepFreezeAndSeal(launch);
    }

    function validateLaunch({
        customers: _customers = requiredArgument("customers"),
        destination: _destination = requiredArgument("destination"),
        launchDate: _launchDate = requiredArgument("launchDate"),
        mission: _mission = requiredArgument("mission"),
        rocket: _rocket = requiredArgument("rocket"),
    }: CreateLaunchInfo = requiredArgument("launchInfo")) {
        return true;
    }

    function normalizeLaunch(launchInfo: CreateLaunchInfo) {
        return {
            ...launchInfo,
            flightNumber: ++currentUid,
            upcoming: true,
            success: true
        };
    }

    return {
        createLaunch,
        validateLaunch,
        normalizeLaunch,
    }
}

export default createLaunchesModel;