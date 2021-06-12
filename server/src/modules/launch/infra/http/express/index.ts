
import launchRouterFactory from "@launch/infra/http/express/launch.router";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Express } from "express";

function createApplyLaunchApi(
    {
        launchRouter = launchRouterFactory(),
    } = {}
) {
    return function applyLaunchApi(app: Express) {
        app.use("/launch", launchRouter);
        return app;
    }
}

const applyLaunchApiFactory = createSingletonFactory(createApplyLaunchApi);

export default applyLaunchApiFactory;