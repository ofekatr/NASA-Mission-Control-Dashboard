import { Router } from "express";
import { PlanetsController } from "./planets.controller";

function createPlanetsRouter(planetsController: PlanetsController) {
    const planetsRouter = Router();

    planetsRouter.get('/', (_, res) => res.send(planetsController.getPlanets()));

    return planetsRouter;
}

export default createPlanetsRouter;