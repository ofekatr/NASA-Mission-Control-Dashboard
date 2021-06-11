import { getAllPlanetsFactory } from "@planet/use-cases";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { NextFunction, Request, Response } from "express";

function createHttpGetAllPlanets(
    {
        getAllPlanets = getAllPlanetsFactory(),
    } = {}
) {
    return function httpGetAllPlanets(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(getAllPlanets());
        } catch (err) {
            return next(err);
        }
    }
}

const httpGetAllPlanetsFactory = createSingletonFactory(createHttpGetAllPlanets);

export default httpGetAllPlanetsFactory;