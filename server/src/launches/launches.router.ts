import { CreateLaunchRouterParams } from "@definitions/launches";

function createLaunchesRouter({ launchesController, Router }: CreateLaunchRouterParams) {
    const launchesRouter = Router();

    launchesRouter.get("/", launchesController.getAllLaunches);

    return launchesRouter;
}

export default createLaunchesRouter;