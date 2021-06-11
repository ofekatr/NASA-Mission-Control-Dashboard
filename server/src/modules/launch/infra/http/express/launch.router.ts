
import launchControllerFactory from "@launch/infra/http/express/launch.controller";
import { singletonify } from "@shared/utils/singleton.utils";
import { Router as expressRouter } from "express";

function createLaunchRouter(
    {
        launchController = launchControllerFactory(),
        Router = expressRouter
    } = {}) {
    const launchRouter = Router();

    launchRouter.get("/", launchController.httpGetAllLaunch);

    launchRouter.post("/", launchController.httpCreateLaunch);

    launchRouter.delete("/:flightNumber", launchController.httpAbortLaunch);

    return launchRouter;
}

const launchRouterFactory = singletonify(createLaunchRouter);

export default launchRouterFactory;