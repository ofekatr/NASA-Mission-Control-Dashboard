
import createLaunchesRouter from "@launches/infra/http/launches.router";
import { Express } from "express";

function loadLaunchesModule(app: Express) {
    const launchesRouter = createLaunchesRouter();
    app.use("/launches", launchesRouter);
    return app;
}

export default loadLaunchesModule;