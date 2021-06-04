import { PlanetsController } from "@planets/planets.controller";
import { Router } from "express";

function createPlanetsRouter(planetsController: PlanetsController): Router {
    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', (_, res) => res.send(planetsController.getAllPlanets()));

    return planetsRouter;
}

export default createPlanetsRouter;