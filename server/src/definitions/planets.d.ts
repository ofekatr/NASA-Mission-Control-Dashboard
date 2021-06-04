import { PlanetsController } from "../planets/planets.controller";
import createPlanetsModel from "../planets/planets.dal";
import createPlanetService from "../planets/planets.service";
import { ThenArg } from "./promises";

export type Planet = any;

export type PlanetsService = ReturnType<typeof createPlanetService>;

export type PlanetsModel = ThenArg<ReturnType<typeof createPlanetsModel>>;

