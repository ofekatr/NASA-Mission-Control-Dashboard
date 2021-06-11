import createPlanetsModel from "@planets/domain/planet";
import createPlanetsController from "@planets/infra/http/express/planets.controller";
import createPlanetsRouter from "@planets/infra/http/express/planets.router";
import createPlanetsDal from "@planets/planets.dal";
import parse from "csv-parse";
import { Router } from "express";
import fs from "fs";
import path from "path";
import { BasicObject } from "../shared/definitions/general";
import { ThenArg } from "../shared/definitions/promises";
import createPlanetService from "./planets.service";



export interface Planet extends BasicObject { }

export type PlanetsModel = ReturnType<typeof createPlanetsModel>;

export type PlanetsDal = ThenArg<ReturnType<typeof createPlanetsDal>>;

export type PlanetsService = ReturnType<typeof createPlanetService>;

export type PlanetsController = ReturnType<typeof createPlanetsController>;

export type PlanetsRouter = ReturnType<typeof createPlanetsRouter>;

export interface CreatePlanetsDalRequestParams {
    parse: typeof parse;
    fs: typeof fs;
    path: typeof path;
    planetsModel: PlanetsModel;
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