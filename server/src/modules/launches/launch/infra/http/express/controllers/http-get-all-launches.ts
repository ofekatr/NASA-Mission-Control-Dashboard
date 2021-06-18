import { Request, Response, NextFunction } from "express";
import { getAllLaunchesFactory } from "@launch/use-cases";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createHttpGetAllLaunches(
    {
        getAllLaunches = getAllLaunchesFactory()
    } = {}
) {
    return async function httpGetAllLaunch(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await getAllLaunches());
        } catch (err) {
            return next(err);
        }
    }
}

const httpGetAllLaunchesFactory = createSingletonFactory(createHttpGetAllLaunches);

export default httpGetAllLaunchesFactory;