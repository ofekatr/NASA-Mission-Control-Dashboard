import { CreateLaunchRouterParams } from "@definitions/launches.defs";
import { requiredArgument } from "@helpers/validators/required-argument";

function createLaunchesRouter({ launchesController = requiredArgument("launchesController"), Router = requiredArgument("Router") }: CreateLaunchRouterParams) {
    const launchesRouter = Router();

    launchesRouter.get("/", launchesController.getAllLaunches);

    return launchesRouter;
}

export default createLaunchesRouter;