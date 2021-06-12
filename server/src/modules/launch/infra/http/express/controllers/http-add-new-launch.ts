import { AddNewLaunchDTO } from "@launch/launch.defs";
import { addNewLaunchFactory } from "@launch/use-cases";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";
import { NextFunction, Request, Response } from "express";

function createHttpAddNewLaunch(
    {
        addNewLaunch = addNewLaunchFactory()
    } = {}
) {
    return async function httpAddNewLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            let launchInfo: AddNewLaunchDTO = req.body ?? requiredArgument("launchInfo");
            let {
                launchDate: _launchDate = requiredArgument("launchDate"),
                mission: _mission = requiredArgument("mission"),
                rocket: _rocket = requiredArgument("rocket"),
                target: _target = requiredArgument("target"),
            } = launchInfo;
            await addNewLaunch(launchInfo);
            return res.status(201).send({ ok: true });
        } catch (err) {
            return next(err);
        }
    }
}

const httpAddNewLaunchFactory = createSingletonFactory(createHttpAddNewLaunch);

export default httpAddNewLaunchFactory;