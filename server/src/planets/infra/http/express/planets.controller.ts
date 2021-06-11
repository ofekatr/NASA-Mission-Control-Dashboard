
import createPlanetService from "@planets/planets.service";
import { NextFunction, Request, Response } from "express";


async function createPlanetsController({ planetsServicePromise = createPlanetService() } = {}) {
    const planetsService = await planetsServicePromise
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