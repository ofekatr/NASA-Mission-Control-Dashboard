import { singletonify } from "@shared/utils/singleton.utils";
import { Router as RouterDep } from "express";
import getPlanetControllerInstance from "planet/infra/http/express/planet.controller";

function createPlanetRouterInstance(
    {
        planetController = getPlanetControllerInstance(),
        Router = RouterDep,
    } = {}
) {

    const planetRouter = Router();

    // GET all planet.
    planetRouter.get('/', planetController.httpGetAllPlanet);

    return planetRouter;
}

const getPlanetRouterInstance = singletonify(createPlanetRouterInstance);

export default getPlanetRouterInstance;