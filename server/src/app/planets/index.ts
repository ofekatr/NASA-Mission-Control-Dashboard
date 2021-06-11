import createPlanetsDal from '@app/planets/planets.dal';
import createPlanetsService from '@app/planets/planets.service';
import createPlanetsModel from '@domain/planet';
import createPlanetsController from '@infra/http/planets/planets.controller';
import createPlanetsRouter from '@infra/http/planets/planets.router';
import parse from 'csv-parse';
import { Express, Router } from "express";
import fs from 'fs';
import path from 'path';

async function loadPlanetsModule(app: Express): Promise<Express> {
    const planetsModel = createPlanetsModel();
    const planetsDal = await createPlanetsDal({ planetsModel, parse, fs, path });
    const planetsService = createPlanetsService({ planetsDal });
    const planetsController = createPlanetsController({ planetsService });
    const planetsRouter = createPlanetsRouter({ planetsController, Router });
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsModule;
