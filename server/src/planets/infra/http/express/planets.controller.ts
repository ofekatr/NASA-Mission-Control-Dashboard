
import { CreatePlanetsControllerParams } from "@planets/planets.defs";
import { NextFunction, Request, Response } from "express";


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