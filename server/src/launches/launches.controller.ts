import { CreateLaunchControllerParams } from "@definitions/launches";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { NextFunction, Request, Response } from "express";

function createLaunchesController({ launchesService }: CreateLaunchControllerParams) {

    function getAllLaunches(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.send(launchesService.getAllLaunches());
        } catch (err) {
            return next(err);
        }
    }

    return deepFreezeAndSeal({
        getAllLaunches,
    });
}

export default createLaunchesController;