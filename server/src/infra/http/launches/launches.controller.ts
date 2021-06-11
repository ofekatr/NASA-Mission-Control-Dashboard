
import { CreateLaunchParams } from "@app/launches/launches.defs";
import createLaunchesService from "@app/launches/launches.service";
import { verifyCustomError, verifyCustomErrorType } from "@app/shared/errors/error-objects/custom-error";
import CustomHttpError from "@app/shared/errors/error-objects/custom-http-error";
import { assertNumber } from "@app/shared/utils/number.utils";
import { deepFreezeAndSeal } from "@app/shared/utils/object.utils";
import { requiredArgument } from "@app/shared/validators/required-argument";
import { NextFunction, Request, Response } from "express";

function createLaunchesController(
    {
        launchesService = createLaunchesService(),
    } = {}
) {

    async function httpGetAllLaunches(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await launchesService.getAllLaunches());
        } catch (err) {
            return next(err);
        }
    }

    async function httpCreateLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            let launchInfo: CreateLaunchParams;
            try {
                launchInfo = req.body ?? requiredArgument("launchInfo");
                let {
                    launchDate: _launchDate = requiredArgument("launchDate"),
                    mission: _mission = requiredArgument("mission"),
                    rocket: _rocket = requiredArgument("rocket"),
                    target: _target = requiredArgument("target"),
                } = launchInfo;
            } catch (err) {
                if (verifyCustomError(err)) {
                    throw new CustomHttpError("invalidRequest", err.message);
                }
                throw err;
            }
            await launchesService.addNewLaunch(launchInfo);
            return res.status(201).send({ ok: true });
        } catch (err) {
            return next(err);
        }
    }

    async function httpAbortLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            try {
                assertNumber(req.params.flightNumber);
            } catch (err) {
                if (verifyCustomError(err)) {
                    throw new CustomHttpError("invalidRequest", err.message);
                }

                throw err;
            }

            const flightNumber = +req.params.flightNumber ?? requiredArgument("flightNumber");
            try {
                await launchesService.abortLaunch(flightNumber);
                return res.status(200).json({
                    ok: true,
                })
            } catch (err) {
                if (verifyCustomErrorType(err, "notFound")) {
                    throw new CustomHttpError("notFound", err.message);
                }

                throw err;
            }
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