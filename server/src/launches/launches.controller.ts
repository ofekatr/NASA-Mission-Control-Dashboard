import { CreateLaunchControllerParams } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";
import { NextFunction, Request, Response } from "express";

function createLaunchesController({ launchesService = requiredArgument("launchesService") }: CreateLaunchControllerParams) {

    function httpGetAllLaunches(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.send(launchesService.getAllLaunches());
        } catch (err) {
            return next(err);
        }
    }

    return deepFreezeAndSeal({
        httpGetAllLaunches,
    });
}

export default createLaunchesController;