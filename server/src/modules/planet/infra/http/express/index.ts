
import planetRouterFactory from "@planet/infra/http/express/planet.router";
import { Express } from "express";


function loadPlanetApi(app: Express): Express {
    const planetRouter = planetRouterFactory();
    app.use("/planet", planetRouter);
    return app;
}

export default loadPlanetApi;
