import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Router as RouterDep } from "express";
import { httpGetAllPlanetsFactory } from "@planet/infra/http/express/controllers";


function createPlanetRouter(
    {
        httpGetAllPlanets = httpGetAllPlanetsFactory(),
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