import { AddNewLaunchDTO } from "@launch/launch.defs";
import { verifyCustomError } from "@shared/errors/error-objects/custom-error";
import CustomHttpError from "@shared/errors/error-objects/custom-http-error";
import { requiredArgument } from "@shared/validators/required-argument";
import { NextFunction, Request, Response } from "express";
import { addNewLaunchFactory } from "@launch/use-cases";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createHttpAddNewLaunch(
    {
        addNewLaunch = addNewLaunchFactory()
    } = {}
) {
    return async function httpAddNewLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            let launchInfo: AddNewLaunchDTO;
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
            await addNewLaunch(launchInfo);
            return res.status(201).send({ ok: true });
        } catch (err) {
            return next(err);
        }
    }
}

const httpAddNewLaunchFactory = createSingletonFactory(createHttpAddNewLaunch);

export default httpAddNewLaunchFactory;