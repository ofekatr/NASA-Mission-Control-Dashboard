
import createPlanetsModel from '@planets/domain/planet';
import createPlanetsController from '@planets/infra/http/express/planets.controller';
import createPlanetsRouter from '@planets/infra/http/express/planets.router';
import createPlanetsDal from '@planets/planets.dal';
import createPlanetsService from '@planets/planets.service';
import parse from 'csv-parse';
import { Express, Router } from "express";
import fs from 'fs';
import path from 'path';


async function loadPlanetsApi(app: Express): Promise<Express> {
    const planetsModel = createPlanetsModel();
    const planetsDal = await createPlanetsDal({ planetsModel, parse, fs, path });
    const planetsService = createPlanetsService({ planetsDal });
    const planetsController = createPlanetsController({ planetsService });
    const planetsRouter = createPlanetsRouter({ planetsController, Router });
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsApi;
