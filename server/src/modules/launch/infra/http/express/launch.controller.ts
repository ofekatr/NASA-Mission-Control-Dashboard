
import { CreateLaunchParams } from "@launch/launch.defs";
import { verifyCustomError, verifyCustomErrorType } from "@shared/errors/error-objects/custom-error";
import CustomHttpError from "@shared/errors/error-objects/custom-http-error";
import { assertNumber } from "@shared/utils/number.utils";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { requiredArgument } from "@shared/validators/required-argument";
import { NextFunction, Request, Response } from "express";
import * as launchUseCasesDep from "@launch/use-cases";

function createLaunchController(
    {
        launchUseCases = launchUseCasesDep,
    } = {}
) {

    async function httpGetAllLaunch(_req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json(await launchUseCases.getAllLaunches());
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
            await launchUseCases.addNewLaunch(launchInfo);
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
                await launchUseCases.abortLaunch(flightNumber);
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
        httpGetAllLaunch,
        httpCreateLaunch,
        httpAbortLaunch,
    });
}

export default createLaunchController;