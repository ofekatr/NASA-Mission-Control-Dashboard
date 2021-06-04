import { CreateLaunchControllerParams } from "@definitions/launches";
import { deepFreezeAndSeal } from "@helpers/object.helper";
import logger from "@logs/logger";
import { Request, Response } from "express";

function createLaunchesController({ launchesService }: CreateLaunchControllerParams) {

    function getAllLaunches(_req: Request, res: Response) {
        try {
            return res.send(launchesService.getAllLaunches());   
        } catch (error) {
            logger.error(error);
            return;
        }
    }

    return deepFreezeAndSeal({
        getAllLaunches,
    });
}

export default createLaunchesController;