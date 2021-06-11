
import createLaunchesRouter from "@launches/infra/http/express/launches.router";
import { Express } from "express";

function loadLaunchesApi(app: Express) {
    const launchesRouter = createLaunchesRouter();
    app.use("/launches", launchesRouter);
    return app;
}

export default loadLaunchesApi;