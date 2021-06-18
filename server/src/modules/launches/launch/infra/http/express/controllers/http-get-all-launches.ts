import { getAllLaunchesFactory } from '@launch/use-cases';
import CustomError from '@shared/errors/error-objects/custom-error';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { NextFunction, Request, Response } from 'express';

function createHttpGetAllLaunches(
    {
        getAllLaunches = getAllLaunchesFactory()
    } = {}
) {
    function parseNumberQueryParam(queryParam: string): number {
        if (isNaN(queryParam as any))
            throw new CustomError('invalidNumber', queryParam);
        return +queryParam;
    }

    function extractNumberOrUndefinedQueryParam(
        queryParam: string | undefined
    ): number | undefined {
        if (queryParam != undefined)
            return parseNumberQueryParam(queryParam);
        return queryParam;
    }

    return async function httpGetAllLaunch(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = extractNumberOrUndefinedQueryParam(
                req.query?.limit as string | undefined
            );
            const page = extractNumberOrUndefinedQueryParam(
                req.query?.page as string | undefined
            );

            return res.status(200).json(await getAllLaunches({ page, limit }));
        } catch (err) {
            return next(err);
        }
    }
}

const httpGetAllLaunchesFactory = createSingletonFactory(createHttpGetAllLaunches);

export default httpGetAllLaunchesFactory;