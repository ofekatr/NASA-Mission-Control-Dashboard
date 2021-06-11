import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Router as RouterDep } from "express";
import { httpGetAllPlanets as httpGetAllPlanetsDep } from "@planet/infra/http/express/controller";


function createPlanetRouter(
    {
        httpGetAllPlanets = httpGetAllPlanetsDep,
        Router = RouterDep,
    } = {}
) {

    const planetRouter = Router();

    // GET all planet.
    planetRouter.get('/', httpGetAllPlanets);

    return planetRouter;
}

const planetRouterFactory = createSingletonFactory(createPlanetRouter);

export default planetRouterFactory;