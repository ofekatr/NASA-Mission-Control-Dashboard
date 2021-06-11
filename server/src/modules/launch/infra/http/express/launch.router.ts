
import getLaunchControllerInstance from "@launch/infra/http/express/launch.controller";
import { singletonify } from "@shared/utils/singleton.utils";
import { Router as expressRouter } from "express";

function createLaunchRouterInstance(
    {
        launchController = getLaunchControllerInstance(),
        Router = expressRouter
    } = {}) {
    const launchRouter = Router();

    launchRouter.get("/", launchController.httpGetAllLaunch);

    launchRouter.post("/", launchController.httpCreateLaunch);

    launchRouter.delete("/:flightNumber", launchController.httpAbortLaunch);

    return launchRouter;
}

const getLaunchRouterInstance = singletonify(createLaunchRouterInstance);

export default getLaunchRouterInstance;