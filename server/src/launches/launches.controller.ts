import { CreateLaunchControllerParams, CreateLaunchInfo } from "@definitions/launches.defs";
import CustomError, { createInvalidNumberError } from "@helpers/errors/error-objects/custom-error";
import { createCustomHttpErrorFromCustomError, createInvalidRequestHttpError } from "@helpers/errors/error-objects/custom-http-error";
import { assertNumber } from "@helpers/number.helper";
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
            let launchInfo: CreateLaunchInfo;
            try {
                launchInfo = req.body ?? requiredArgument("launchInfo");
                launchesModel.assertValidLaunch(launchInfo);
            } catch (err) {
                if (err instanceof CustomError) {
                    throw createInvalidRequestHttpError(err.message);
                }
                throw err;
            }
            return res.status(201).send({ ok: launchesService.addNewLaunch(launchInfo) });
        } catch (err) {
            return next(err);
        }
    }

    function httpAbortLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            const flightNumber = +req.params.flightNumber ?? requiredArgument("flightNumber");
            try {
                assertNumber(flightNumber);
            } catch (err) {
                if (err instanceof CustomError) {
                    throw createInvalidRequestHttpError(err.message);
                }

                throw err;
            }

            return res.status(200).json({
                ok: launchesService.abortLaunch(flightNumber)
            })
        } catch (err) {
            return next(err);
        }
    }

    return deepFreezeAndSeal({
        httpGetAllLaunches,
        httpCreateLaunch,
        httpAbortLaunch,
    });
}

export default createLaunchesController;