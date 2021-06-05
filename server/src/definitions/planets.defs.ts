import createPlanetsController from "@planets/planets.controller";
import createPlanetsDal from "@planets/planets.dal";
import createPlanetsRouter from "@planets/planets.router";
import parse from "csv-parse";
import { Router } from "express";
import fs from "fs";
import path from "path";
import createPlanetService from "../planets/planets.service";
import { BasicObject } from "./general.defs";
import { ThenArg } from "./promises.defs";

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

export interface CreatePlanetsControllerParams {
    planetsService: PlanetsService
}

export interface CreatePlanetsRouterParamas {
    planetsController: PlanetsController;
    Router: typeof Router;
}