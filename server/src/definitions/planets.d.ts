import createPlanetsDal from "@planets/planets.dal";
import createPlanetsRouter from "@planets/planets.router";
import createPlanetsController from "@planets/planets.controller";
import createPlanetService from "../planets/planets.service";
import { ThenArg } from "./promises";

export type Planet = any;

export type PlanetsDal = ThenArg<ReturnType<typeof createPlanetsDal>>;

export type PlanetsService = ReturnType<typeof createPlanetService>;

export type PlanetsController = ReturnType<typeof createPlanetsController>;

export type PlanetsRouter = ReturnType<typeof createPlanetsRouter>;

