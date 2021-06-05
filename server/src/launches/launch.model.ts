import { CreateLaunchInfo, Launch } from "@definitions/launches.defs";
import { assertDateInput } from "@helpers/validators/dates";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesModel() {
    let currentUid = 99;

    function createLaunch(launchInfo: CreateLaunchInfo = requiredArgument("launchInfo")) {
        assertValidLaunch(launchInfo);
        const launch = normalizeLaunch(launchInfo);
        return launch;
    }

    function abortLaunch(launch: Launch) {
        launch.success = false;
        launch.upcoming = false;
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
        abortLaunch,
    }
}

export default createLaunchesModel;