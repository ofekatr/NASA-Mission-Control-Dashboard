import createPlanetsController from "@planets/planets.controller";
import createPlanetsDal from "@planets/planets.dal";
import createPlanetsRouter from "@planets/planets.router";
import createPlanetsService from "@planets/planets.service";
import parse from 'csv-parse';
import { Express, Router } from "express";
import fs from 'fs';
import path from 'path';

async function loadPlanetsModule(app: Express): Promise<Express> {
    const planetsDal = await createPlanetsDal({ parse, fs, path });
    const planetsService = createPlanetsService({ planetsDal });
    const planetsController = createPlanetsController({ planetsService });
    const planetsRouter = createPlanetsRouter({ planetsController, Router });
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsModule;
