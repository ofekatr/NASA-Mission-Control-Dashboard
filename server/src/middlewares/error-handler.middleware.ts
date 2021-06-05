import handleError from "@helpers/errors/error-handler";
import CustomHttpError from "@helpers/errors/error-objects/custom-http-error";
import { Request, Response, NextFunction, Express } from "express";

function errorHandlerMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    handleError(err);

    if (err instanceof CustomHttpError) {
        return res.status(err.httpStatus).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal Error" });
}

function applyErrorHandlingMiddleware(app: Express) {
    app.use(errorHandlerMiddleware);
    return app;
}

export default applyErrorHandlingMiddleware;