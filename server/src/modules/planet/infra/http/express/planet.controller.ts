
import { singletonify } from "@shared/utils/singleton.utils";
import { NextFunction, Request, Response } from "express";
import getPlanetServiceInstance from "planet/planet.service";


function createPlanetControllerInstance({ planetService = getPlanetServiceInstance() } = {}) {
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

const getPlanetControllerInstance = singletonify(createPlanetControllerInstance);

export default getPlanetControllerInstance;