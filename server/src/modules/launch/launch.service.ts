import { createEntityForNewLaunch } from "@launch/domain/launch";
import { CreateLaunchParams } from "@launch/launch.defs";
import createLaunchRepo from "@launch/launch.repo";
import CustomError from "@shared/errors/error-objects/custom-error";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";

function createLaunchService({
    launchDal = createLaunchRepo(),
    createLaunch = createEntityForNewLaunch,
} = {}) {

    async function getAllLaunch() {
        return await launchDal.getAllLaunch();
    }

    async function addNewLaunch(launchInfo: CreateLaunchParams) {
        const launch = createLaunch(launchInfo);
        return await launchDal.saveLaunch(launch);
    }

    async function abortLaunch(flightNumber: number) {
        if (!(await launchDal.verifyLaunchExists(flightNumber))) {
            throw new CustomError("notFound");
        }

        let launch = await launchDal.getLaunchByFlightNumber(flightNumber);
        launch.abortLaunch();
        launchDal.saveLaunch(launch);
    }

    return deepFreezeAndSeal({
        getAllLaunch,
        addNewLaunch,
        abortLaunch,
    });
}

export default createLaunchService;