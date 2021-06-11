
import createLaunchController from "@launch/infra/http/express/launch.controller";
import { Router as expressRouter } from "express";

function createLaunchRouter(
    {
        launchController = createLaunchController(),
        Router = expressRouter
    } = {}) {
    const launchRouter = Router();

    launchRouter.get("/", launchController.httpGetAllLaunch);

    launchRouter.post("/", launchController.httpCreateLaunch);

    launchRouter.delete("/:flightNumber", launchController.httpAbortLaunch);

    return launchRouter;
}

export default createLaunchRouter;