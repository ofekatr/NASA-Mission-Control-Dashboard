
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { NextFunction, Request, Response } from "express";
import { getAllPlanets as getAllPlanetsDep } from "@planet/use-cases";


function createPlanetController(
    {
        getAllPlanets = getAllPlanetsDep,
    } = {}
) {
    function httpGetAllPlanet(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(getAllPlanets());
        } catch (err) {
            return next(err);
        }
    }

    return {
        httpGetAllPlanet,
    };
}

const planetControllerFactory = createSingletonFactory(createPlanetController);

export default planetControllerFactory;