import { Request, Response, NextFunction } from "express";
import { CreatePlanetsControllerParams } from "@definitions/planets.defs";

function createPlanetsController({ planetsService }: CreatePlanetsControllerParams) {
    function getAllPlanets(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.send(planetsService.getAllPlanets());
        } catch (err) {
            return next(err);
        }
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsController = ReturnType<typeof createPlanetsController>;
export default createPlanetsController;