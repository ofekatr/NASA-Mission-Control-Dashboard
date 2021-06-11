import createLaunchRepo from "@launch/launch.repo";

function createGetAllLaunches(
    {
        launchRepo = createLaunchRepo(),
    } = {},
) {
    async function getAllLaunches() {
        return await launchRepo.getAllLaunches();
    }

    return getAllLaunches;
}

export default createGetAllLaunches;