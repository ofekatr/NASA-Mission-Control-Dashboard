import createLaunchesModel from "@launches/launch.model";
import createLaunchesController from "@launches/launches.controller";
import createLaunchesDal from "@launches/launches.dal";
import Launch from "@launches/launches.mongo";
import createLaunchesRouter from "@launches/launches.router";
import createLaunchesService from "@launches/launches.service";
import { Express, Router } from "express";

function loadLaunchesModule(app: Express) {
    const launchesModel = createLaunchesModel();
    const launchesDal = createLaunchesDal({ db: Launch, launchesModel });
    const launchesService = createLaunchesService({ launchesDal, launchesModel });
    const launchesController = createLaunchesController({ launchesService, launchesModel });
    const launchesRouter = createLaunchesRouter({ launchesController, Router });
    app.use("/launches", launchesRouter);
    return app;
}

export default loadLaunchesModule;