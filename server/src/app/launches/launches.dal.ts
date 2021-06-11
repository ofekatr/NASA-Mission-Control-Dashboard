import { LaunchEntity } from "@app/launches/launches.defs";
import LaunchesDao from "@app/launches/launches.mongo";
import { deepFreezeAndSeal } from "@app/shared/utils/object.utils";
import notFound from "@app/shared/validators/not-found";
import { requiredArgument } from "@app/shared/validators/required-argument";
import { createLaunchEntityForExisting } from "@domain/launch";

function createLaunchesDal({
    db = LaunchesDao,
    fillLaunch = createLaunchEntityForExisting,
} = {}) {
    async function getAllLaunches(): Promise<LaunchEntity[]> {
        return (await db.find()).map(dbLaunch => fillLaunch(dbLaunch));
    }

    async function getLaunchByFlightNumber(
        flightNumber: number = requiredArgument("flightNumber")
    ): Promise<LaunchEntity> {
        const dbLaunch = await db.findOne({ flightNumber }) ?? notFound(`Launch flight number: ${flightNumber}`);
        return fillLaunch(dbLaunch!);
    }

    async function verifyLaunchExists(
        flightNumber: number = requiredArgument("flightNumber")
    ) {
        return !!(await getLaunchByFlightNumber(flightNumber));
    }

    async function saveLaunch({
        flightNumber,
        target,
        customers,
        launchDate,
        mission,
        rocket,
        success,
        upcoming,
    }: LaunchEntity) {
        await db.findOneAndUpdate(
            { flightNumber },
            {
                target,
                launchDate,
                mission,
                rocket,
                upcoming,
                success,
                customers,
            },
            { upsert: true }
        );
    }

    return deepFreezeAndSeal({
        saveLaunch,
        getAllLaunches,
        getLaunchByFlightNumber,
        verifyLaunchExists,
    });
}

export default createLaunchesDal;