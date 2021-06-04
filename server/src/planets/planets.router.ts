import { ExpandType } from "@definitions/general";
import { PlanetsController } from "@planets/planets.controller";

type CreatePlanetsRouterParamas = ExpandType<{
    planetsController: PlanetsController;
    Router: any;
}>

function createPlanetsRouter(createParams: CreatePlanetsRouterParamas) {
    const { planetsController, Router } = createParams;

    const planetsRouter = Router();

    // GET all planets.
    planetsRouter.get('/', (_req, res) => res.send(planetsController.getAllPlanets()));

    return planetsRouter;
}

export default createPlanetsRouter;