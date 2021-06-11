import abortLaunchFactory from "@launch/use-cases/abort-launch";
import addNewLaunchFactory from "@launch/use-cases/add-new-launch";
import getAllLaunchesFactory from "@launch/use-cases/get-all-launches";

const getAllLaunches = getAllLaunchesFactory();

const addNewLaunch = addNewLaunchFactory();

const abortLaunch = abortLaunchFactory();

export {
    abortLaunch,
    addNewLaunch,
    getAllLaunches,
};

