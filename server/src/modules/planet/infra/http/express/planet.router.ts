import { Router as RouterDep } from "express";
import createPlanetController from "planet/infra/http/express/planet.controller";

function createPlanetRouter(
    {
        planetController = createPlanetController(),
        Router = RouterDep,
    } = {}
) {

    const planetRouter = Router();

    // GET all planet.
    planetRouter.get('/', planetController.httpGetAllPlanet);

    return planetRouter;
}

export default createPlanetRouter;