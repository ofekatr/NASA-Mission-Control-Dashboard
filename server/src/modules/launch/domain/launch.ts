import { CreateEntityForExistingLaunchParams, CreateLaunchParams, LaunchEntity } from "@launch/launch.defs";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { assertDateInput } from "@shared/validators/dates";
import { requiredArgument } from "@shared/validators/required-argument";

let currentFlightNumber = 99;

function createEntityForNewLaunch(
    launchInfo: CreateLaunchParams = requiredArgument("launchInfo")
): LaunchEntity {
    assertValidCreateLaunchInfo(launchInfo);
    const launch = normalizeLaunch(launchInfo);
    return buildLaunchEntity(launch);
}

function createLaunchEntityForExisting(
    params: CreateEntityForExistingLaunchParams,
): LaunchEntity {
    assertValidBuildLaunchEntityForExistingLaunchParams(params);
    return buildLaunchEntity(params);
}

function assertValidBuildLaunchEntityForExistingLaunchParams({
    flightNumber: _flightNumber = requiredArgument("flightNumber"),
    launchDate = requiredArgument("launchDate"),
    mission: _mission = requiredArgument("mission"),
    target: _target = requiredArgument("target"),
    rocket: _rocket = requiredArgument("rocket"),
    success: _success = requiredArgument("success"),
    upcoming: _upcoming = requiredArgument("upcoming"),
}: CreateEntityForExistingLaunchParams) {
    return assertDateInput(launchDate);
}

function buildLaunchEntity(
    {
        flightNumber,
        launchDate,
        mission,
        target,
        rocket,
        success,
        upcoming,
        customers,
    }: CreateEntityForExistingLaunchParams = requiredArgument("buildLaunchEntityParams")
) {
    return deepFreezeAndSeal({
        flightNumber,
        mission,
        target,
        rocket,
        launchDate,
        success,
        upcoming,
        customers,
        abortLaunch: () => {
            success = false;
            upcoming = false;
        }
    });
}

function assertValidCreateLaunchInfo({
    target: _target = requiredArgument("target"),
    launchDate = requiredArgument("launchDate"),
    mission: _mission = requiredArgument("mission"),
    rocket: _rocket = requiredArgument("rocket"),
}: CreateLaunchParams = requiredArgument("launchInfo")) {
    assertDateInput(launchDate);
}

function normalizeLaunch(
    {
        target,
        launchDate,
        mission,
        rocket
    }: CreateLaunchParams = requiredArgument("launchInfo")
): CreateEntityForExistingLaunchParams {
    return {
        target,
        mission,
        rocket,
        flightNumber: ++currentFlightNumber,
        launchDate: new Date(launchDate),
        upcoming: true,
        success: true,
    };
}

export {
    createEntityForNewLaunch,
    createLaunchEntityForExisting,
};

