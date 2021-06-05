import { CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { assertDateInput } from "@helpers/validators/dates";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesModel() {
    let currentUid = 99;

    function createLaunch(launchInfo: CreateLaunchInfo = requiredArgument("launchInfo")) {
        validateLaunch(launchInfo);
        const launch = normalizeLaunch(launchInfo);
        return deepFreezeAndSeal(launch);
    }

    function validateLaunch({
        destination: _destination = requiredArgument("destination"),
        launchDate = requiredArgument("launchDate"),
        mission: _mission = requiredArgument("mission"),
        rocket: _rocket = requiredArgument("rocket"),
    }: CreateLaunchInfo = requiredArgument("launchInfo")) {
        assertDateInput(launchDate);
    }

    function normalizeLaunch(launchInfo: CreateLaunchInfo = requiredArgument("launchInfo")) {
        return {
            ...launchInfo,
            flightNumber: ++currentUid,
            upcoming: true,
            success: true,
            customers: [],
            launchDate: new Date(launchInfo.launchDate),
        };
    }

    return {
        createLaunch,
        validateLaunch,
        normalizeLaunch,
    }
}

export default createLaunchesModel;