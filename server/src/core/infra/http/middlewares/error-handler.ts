
import handleError from "@shared/errors/error-handler";
import { verifyCustomHttpError } from "@shared/errors/error-objects/custom-http-error";
import { Express, NextFunction, Request, Response } from "express";

function errorHandlerMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    handleError(err);

    if (verifyCustomHttpError(err)) {
        return res.status((err.httpStatus)).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal Error" });
}

function applyErrorHandlingMiddleware(app: Express) {
    app.use(errorHandlerMiddleware);
    return app;
}

export default applyErrorHandlingMiddleware;