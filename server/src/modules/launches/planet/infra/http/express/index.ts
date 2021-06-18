
import planetRouterFactory from "@planet/infra/http/express/planet.router";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Express } from "express";

function createApplyPlanetApi(
    {
        planetRouter = planetRouterFactory()
    } = {}
) {
    return function applyPlanetApi(app: Express): Express {
        app.use("/planet", planetRouter);
        return app;
    }
}

const applyPlanetApiFactory = createSingletonFactory(createApplyPlanetApi);

export default applyPlanetApiFactory;