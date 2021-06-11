
import launchRouterFactory from "@launch/infra/http/express/launch.router";
import { Express } from "express";

function applyLaunchApi(app: Express) {
    const launchRouter = launchRouterFactory();
    app.use("/launch", launchRouter);
    return app;
}

export default applyLaunchApi;