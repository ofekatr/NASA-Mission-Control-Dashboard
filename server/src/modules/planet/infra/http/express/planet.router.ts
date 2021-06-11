import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { Router as RouterDep } from "express";
import planetControllerFactory from "planet/infra/http/express/planet.controller";

function createPlanetRouter(
    {
        planetController = planetControllerFactory(),
        Router = RouterDep,
    } = {}
) {

    const planetRouter = Router();

    // GET all planet.
    planetRouter.get('/', planetController.httpGetAllPlanet);

    return planetRouter;
}

const planetRouterFactory = createSingletonFactory(createPlanetRouter);

export default planetRouterFactory;