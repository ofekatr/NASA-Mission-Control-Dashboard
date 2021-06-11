
import { singletonify } from "@shared/utils/singleton.utils";
import { NextFunction, Request, Response } from "express";
import planetServiceFactory from "planet/planet.service";


function createPlanetController({ planetService = planetServiceFactory() } = {}) {
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

const planetControllerFactory = singletonify(createPlanetController);

export default planetControllerFactory;