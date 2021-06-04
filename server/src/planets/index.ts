import createPlanetsController from "@planets/planets.controller";
import createPlanetsService from "@planets/planets.service";
import createPlanetsModel from "@planets/planets.dal";
import createPlanetsRouter from "./planets.router";
import { Express } from "express";


async function loadPlanetsModule(app: Express): Promise<Express> {
    const planetsModel = await createPlanetsModel();
    const planetsService = createPlanetsService(planetsModel);
    const planetsController = createPlanetsController(planetsService);
    const planetsRouter = createPlanetsRouter(planetsController);
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsModule;
