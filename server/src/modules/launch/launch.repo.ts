import { getRepository } from "@core/infra/data/db/typeorm/mongo";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import notFound from "@shared/validators/not-found";
import { requiredArgument } from "@shared/validators/required-argument";
import Launch from "@launch/domain/launch";

function createLaunchRepo({
    db = getRepository(Launch),
} = {}) {
    async function getAllLaunches(): Promise<Launch[]> {
        return await db.find();
    }

    async function getLaunchByFlightNumber(
        flightNumber: number = requiredArgument("flightNumber")
    ): Promise<Launch> {
        const dbLaunch = await db.findOneOrFail({
            where: {
                flightNumber
            }
        }) ?? notFound(`Launch flight number: ${flightNumber}`);
        return dbLaunch;
    }

    async function verifyLaunchExists(
        flightNumber: number = requiredArgument("flightNumber")
    ) {
        try {
            await getLaunchByFlightNumber(flightNumber);
            return true;
        } catch (err) {
            return false;
        }
    }

    async function saveLaunch(launch: Launch) {
        await db.save(launch);
    }

    return deepFreezeAndSeal({
        saveLaunch,
        getAllLaunches,
        getLaunchByFlightNumber,
        verifyLaunchExists,
    });
}

const launchRepoFactory = createSingletonFactory(createLaunchRepo);

export default launchRepoFactory;