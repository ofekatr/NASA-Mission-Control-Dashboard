import getPlanetRepoInstance from "@planet/planet.repo";
import planetModel from "planet/domain/planet";
import getPlanetControllerInstance from "planet/infra/http/express/planet.controller";
import getPlanetRouterInstance from "planet/infra/http/express/planet.router";
import { BasicObject } from "../shared/definitions/general";
import getPlanetServiceInstance from "./planet.service";



export interface Planet extends BasicObject { }

export type PlanetModel = typeof planetModel;

export type PlanetDal = ReturnType<typeof getPlanetRepoInstance>;

export type PlanetService = ReturnType<typeof getPlanetServiceInstance>;

export type PlanetController = ReturnType<typeof getPlanetControllerInstance>;

export type PlanetRouter = ReturnType<typeof getPlanetRouterInstance>;