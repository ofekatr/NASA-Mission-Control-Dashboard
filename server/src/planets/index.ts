import createPlanetsController from "@planets/planets.controller";
import createPlanetsModel from "@planets/planets.dal";
import createPlanetsService from "@planets/planets.service";
import parse from 'csv-parse';
import { Express, Router } from "express";
import fs from 'fs';
import path from 'path';
import createPlanetsRouter from "./planets.router";

async function loadPlanetsModule(app: Express): Promise<Express> {
    const planetsModel = await createPlanetsModel({ parse, fs, path });
    const planetsService = createPlanetsService(planetsModel);
    const planetsController = createPlanetsController(planetsService);
    const planetsRouter = createPlanetsRouter({ planetsController, Router });
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsModule;
