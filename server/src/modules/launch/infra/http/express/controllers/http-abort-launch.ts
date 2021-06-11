import { abortLaunchFactory } from "@launch/use-cases";
import { verifyCustomError, verifyCustomErrorType } from "@shared/errors/error-objects/custom-error";
import CustomHttpError from "@shared/errors/error-objects/custom-http-error";
import { assertNumber } from "@shared/utils/number.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";
import { NextFunction, Request, Response } from "express";

function createHttpAbortLaunch(
    {
        abortLaunch = abortLaunchFactory()
    } = {}
) {
    return async function httpAbortLaunch(req: Request, res: Response, next: NextFunction) {
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
                await abortLaunch(flightNumber);
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
}

const httpAbortLaunchFactory = createSingletonFactory(createHttpAbortLaunch);

export default httpAbortLaunchFactory;