import createPlanetsController from "@planets/infra/http/express/planets.controller";
import { Router as RouterDep } from "express";

async function createPlanetsRouter(
    {
        planetsControllerPromise = createPlanetsController(),
        Router = RouterDep,
    } = {}
) {
    const planetsController = await planetsControllerPromise;
    
    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', planetsController.httpGetAllPlanets);

    return planetsRouter;
}

export default createPlanetsRouter;