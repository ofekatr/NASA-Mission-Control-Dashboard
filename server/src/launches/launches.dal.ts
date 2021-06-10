import { CreateLaunchesDalParams, Launch } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesDal({ db, launchesModel }: CreateLaunchesDalParams = requiredArgument("")) {
    async function getAllLaunches(): Promise<Launch[]> {
        return (await db.find()).map(dbLaunch => launchesModel.createLaunch(dbLaunch as any));
    }

    async function getLaunchByFlightNumber(flightNumber: number = requiredArgument("flightNumber")): Promise<Launch> {
        return await db.findOne({ flightNumber }) as any;
    }

    async function verifyLaunchExists(flightNumber: number = requiredArgument("flightNumber")) {
        return !!(await getLaunchByFlightNumber(flightNumber));
    }

    async function saveLaunch(launch: Launch) {
        await db.findOneAndUpdate(
            { flightNumber: launch.flightNumber },
            launch,
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