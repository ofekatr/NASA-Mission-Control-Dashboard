import { CreateLaunchControllerParams, CreateLaunchInfo } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import { requiredArgument } from "@helpers/validators/required-argument";
import { NextFunction, Request, Response } from "express";

function createLaunchesController({ launchesService = requiredArgument("launchesService"), launchesModel = requiredArgument("launchesModel") }: CreateLaunchControllerParams) {

    function httpGetAllLaunches(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(launchesService.getAllLaunches());
        } catch (err) {
            return next(err);
        }
    }

    function httpCreateLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            const launchInfo: CreateLaunchInfo = req.body ?? requiredArgument("launchInfo");
            launchesModel.validateLaunch(launchInfo);
            return res.status(201).send(launchesService.createLaunch(launchInfo));
        } catch (err) {
            return next(err);
        }
    }

    return deepFreezeAndSeal({
        httpGetAllLaunches,
        httpCreateLaunch,
    });
}

export default createLaunchesController;