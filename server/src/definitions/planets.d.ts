import createPlanetsController from "@planets/planets.controller";
import createPlanetsDal from "@planets/planets.dal";
import createPlanetsRouter from "@planets/planets.router";
import fs from "fs";
import path from "path";
import parse from "csv-parse"
import createPlanetService from "../planets/planets.service";
import { BasicObject } from "./general";
import { ThenArg } from "./promises";

export interface Planet extends BasicObject { }

export type PlanetsDal = ThenArg<ReturnType<typeof createPlanetsDal>>;

export type PlanetsService = ReturnType<typeof createPlanetService>;

export type PlanetsController = ReturnType<typeof createPlanetsController>;

export type PlanetsRouter = ReturnType<typeof createPlanetsRouter>;

export interface CreatePlanetsDalRequestParams {
    parse: typeof parse;
    fs: typeof fs;
    path: typeof path;
}

export interface CreatePlanetsServiceParams {
    planetsDal: PlanetsDal;
}