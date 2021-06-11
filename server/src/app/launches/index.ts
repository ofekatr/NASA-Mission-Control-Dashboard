import createLaunchesRouter from "@infra/http/launches/launches.router";
import { Express } from "express";

function loadLaunchesModule(app: Express) {
    const launchesRouter = createLaunchesRouter();
    app.use("/launches", launchesRouter);
    return app;
}

export default loadLaunchesModule;