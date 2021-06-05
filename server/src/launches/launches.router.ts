import { CreateLaunchRouterParams } from "@definitions/launches.defs";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesRouter({ launchesController = requiredArgument("launchesController"), Router = requiredArgument("Router") }: CreateLaunchRouterParams) {
    const launchesRouter = Router();

    launchesRouter.get("/", launchesController.httpGetAllLaunches);

    launchesRouter.post("/", launchesController.httpCreateLaunch);

    return launchesRouter;
}

export default createLaunchesRouter;