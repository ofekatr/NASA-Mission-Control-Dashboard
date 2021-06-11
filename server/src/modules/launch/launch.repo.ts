import LaunchDao from "@core/infra/data/db/mongo/models/launch";
import { createLaunchEntityForExisting } from "@launch/domain/launch";
import { LaunchEntity } from "@launch/launch.defs";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import notFound from "@shared/validators/not-found";
import { requiredArgument } from "@shared/validators/required-argument";

function createLaunchDal({
    db = LaunchDao,
    fillLaunch = createLaunchEntityForExisting,
} = {}) {
    async function getAllLaunch(): Promise<LaunchEntity[]> {
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
        getAllLaunch,
        getLaunchByFlightNumber,
        verifyLaunchExists,
    });
}

export default createLaunchDal;