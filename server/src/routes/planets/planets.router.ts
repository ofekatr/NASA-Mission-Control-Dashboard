import { Router, Express } from "express";
import { PlanetsController } from "./planets.controller";

function attachPlanetsRouter(app: Express, planetsController: PlanetsController) {
    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', (_, res) => res.send(planetsController.getAllPlanets()));

    app.use('/planets', planetsRouter);
    return app;
}

export default attachPlanetsRouter;