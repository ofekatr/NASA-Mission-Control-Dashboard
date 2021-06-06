import { Request, Response, NextFunction } from "express";
import { CreatePlanetsControllerParams } from "@definitions/planets.defs";

function createPlanetsController({ planetsService }: CreatePlanetsControllerParams) {
    function httpGetAllPlanets(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(planetsService.getAllPlanets());
        } catch (err) {
            return next(err);
        }
    }

    return {
        httpGetAllPlanets,
    };
}

export default createPlanetsController;