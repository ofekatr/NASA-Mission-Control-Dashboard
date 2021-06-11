import { CreatePlanetsRouterParamas } from "@app/planets/planets.defs";

function createPlanetsRouter(createParams: CreatePlanetsRouterParamas) {
    const { planetsController, Router } = createParams;

    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', planetsController.httpGetAllPlanets);

    return planetsRouter;
}

export default createPlanetsRouter;