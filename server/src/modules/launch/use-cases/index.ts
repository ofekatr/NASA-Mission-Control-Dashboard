import createAbourtLaunch from "@launch/use-cases/abort-launch";
import createAddNewLaunch from "@launch/use-cases/add-new-launch";
import { createEntityForNewLaunch } from "@launch/domain/launch";
import createGetAllLaunches from "@launch/use-cases/get-all-launches";
import createLaunchRepo from "@launch/launch.repo";

const launchRepo = createLaunchRepo();
const createLaunch = createEntityForNewLaunch;

const getAllLaunches = createGetAllLaunches({
    launchRepo,
});

const addNewLaunch = createAddNewLaunch(
    {
        launchRepo,
        createLaunch,
    }
);

const abortLaunch = createAbourtLaunch({
    launchRepo,
});

export {
    abortLaunch,
    addNewLaunch,
    getAllLaunches,
};

