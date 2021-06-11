
import createLaunchRouter from "@launch/infra/http/express/launch.router";
import { Express } from "express";

function loadLaunchApi(app: Express) {
    const launchRouter = createLaunchRouter();
    app.use("/launch", launchRouter);
    return app;
}

export default loadLaunchApi;