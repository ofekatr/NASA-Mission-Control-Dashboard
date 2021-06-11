
import createLaunchesController from "@launches/infra/http/express/launches.controller";
import { Router as expressRouter } from "express";

function createLaunchesRouter(
    {
        launchesController = createLaunchesController(),
        Router = expressRouter
    } = {}) {
    const launchesRouter = Router();

    launchesRouter.get("/", launchesController.httpGetAllLaunches);

    launchesRouter.post("/", launchesController.httpCreateLaunch);

    launchesRouter.delete("/:flightNumber", launchesController.httpAbortLaunch);

    return launchesRouter;
}

export default createLaunchesRouter;