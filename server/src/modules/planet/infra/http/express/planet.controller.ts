
import { NextFunction, Request, Response } from "express";
import createPlanetService from "planet/planet.service";


function createPlanetController({ planetService = createPlanetService() } = {}) {
    function httpGetAllPlanet(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(planetService.getAllPlanet());
        } catch (err) {
            return next(err);
        }
    }

    return {
        httpGetAllPlanet,
    };
}

export default createPlanetController;