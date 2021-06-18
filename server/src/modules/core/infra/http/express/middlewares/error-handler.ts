
import handleError from '@shared/errors/error-handler';
import { verifyCustomError } from '@shared/errors/error-objects/custom-error';
import CustomHttpError, { mapCustomErrorToCustomHttpError, verifyCustomHttpError } from '@shared/errors/error-objects/custom-http-error';
import { Express, NextFunction, Request, Response } from 'express';

function errorHandlerMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    handleError(err);

    if (verifyCustomError(err))
        err = mapCustomErrorToCustomHttpError(err);

    if (verifyCustomHttpError(err))
        return res.status((err.httpStatus)).json({ error: err.message });

    const defaultError = new CustomHttpError();

    return res.status(defaultError.httpStatus).json({ error: defaultError.message });
}

function applyErrorHandlingMiddleware(app: Express) {
    app.use(errorHandlerMiddleware);
    return app;
}

export default applyErrorHandlingMiddleware;