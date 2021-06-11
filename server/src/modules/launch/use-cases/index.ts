import getAbortLaunchInstance from "@launch/use-cases/abort-launch";
import getAddNewLaunchInstance from "@launch/use-cases/add-new-launch";
import getGetAllLaunchesInstance from "@launch/use-cases/get-all-launches";

const getAllLaunches = getGetAllLaunchesInstance();

const addNewLaunch = getAddNewLaunchInstance();

const abortLaunch = getAbortLaunchInstance();

export {
    abortLaunch,
    addNewLaunch,
    getAllLaunches,
};

