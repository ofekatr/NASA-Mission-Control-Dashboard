import { abortLaunchFactory } from '@launch/use-cases';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { requiredArgument } from '@shared/validators/required-argument';
import { NextFunction, Request, Response } from 'express';

function createHttpAbortLaunch(
    {
        abortLaunch = abortLaunchFactory()
    } = {}
) {
    return async function httpAbortLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            const flightNumber = req.params.flightNumber ?? requiredArgument('flightNumber');
            await abortLaunch(flightNumber);
            return res.status(200).json({
                ok: true,
            });
        } catch (err) {
            return next(err);
        }
    }
}

const httpAbortLaunchFactory = createSingletonFactory(createHttpAbortLaunch);

export default httpAbortLaunchFactory;