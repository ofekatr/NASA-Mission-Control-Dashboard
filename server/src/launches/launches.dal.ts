import { LaunchEntity } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import notFound from "@helpers/validators/not-found";
import { requiredArgument } from "@helpers/validators/required-argument";
import { createLaunchEntityForExisting } from "@launches/launch.entity";
import LaunchesDb from "@launches/launches.mongo";

function createLaunchesDal({
    db = LaunchesDb,
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