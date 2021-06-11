import createPlanetRepo from "@planet/planet.repo";
import planetModel from "planet/domain/planet";
import createPlanetController from "planet/infra/http/express/planet.controller";
import createPlanetRouter from "planet/infra/http/express/planet.router";
import { BasicObject } from "../shared/definitions/general";
import createPlanetService from "./planet.service";



export interface Planet extends BasicObject { }

export type PlanetModel = typeof planetModel;

export type PlanetDal = ReturnType<typeof createPlanetRepo>;

export type PlanetService = ReturnType<typeof createPlanetService>;

export type PlanetController = ReturnType<typeof createPlanetController>;

export type PlanetRouter = ReturnType<typeof createPlanetRouter>;