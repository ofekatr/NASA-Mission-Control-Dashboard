import { CreatePlanetsRouterParamas } from "@definitions/planets";

function createPlanetsRouter(createParams: CreatePlanetsRouterParamas) {
    const { planetsController, Router } = createParams;

    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', (_req, res) => res.send(planetsController.getAllPlanets()));

    return planetsRouter;
}

export default createPlanetsRouter;