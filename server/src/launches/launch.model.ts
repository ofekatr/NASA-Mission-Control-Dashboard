import { CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { assertDateInput } from "@helpers/validators/dates";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesModel() {
    let currentUid = 99;

    function createLaunch(launchInfo: CreateLaunchInfo = requiredArgument("launchInfo")) {
        assertValidLaunch(launchInfo);
        const launch = normalizeLaunch(launchInfo);
        return deepFreezeAndSeal(launch);
    }

    function assertValidLaunch({
        target: _target = requiredArgument("target"),
        launchDate = requiredArgument("launchDate"),
        mission: _mission = requiredArgument("mission"),
        rocket: _rocket = requiredArgument("rocket"),
    }: CreateLaunchInfo = requiredArgument("launchInfo")) {
        assertDateInput(launchDate);
    }

    function normalizeLaunch({ target, launchDate, mission, rocket }: CreateLaunchInfo = requiredArgument("launchInfo")) {
        return {
            target,
            mission,
            rocket,
            flightNumber: ++currentUid,
            upcoming: true,
            success: true,
            customers: [],
            launchDate: new Date(launchDate),
        };
    }

    return {
        createLaunch,
        assertValidLaunch,
        normalizeLaunch,
    }
}

export default createLaunchesModel;