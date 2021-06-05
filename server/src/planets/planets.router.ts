import { CreatePlanetsRouterParamas } from "@definitions/planets.defs";

function createPlanetsRouter(createParams: CreatePlanetsRouterParamas) {
    const { planetsController, Router } = createParams;

    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', planetsController.getAllPlanets);

    return planetsRouter;
}

export default createPlanetsRouter;