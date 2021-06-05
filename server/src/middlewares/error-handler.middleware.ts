import handleError from "@helpers/errors/error-handler";
import { Request, Response, NextFunction, Express } from "express";

function errorHandlerMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    handleError(err);
    res.status(500).send("Internal Error.");
}

function applyErrorHandlingMiddleware(app: Express) {
    app.use(errorHandlerMiddleware);
    return app;
}

export default applyErrorHandlingMiddleware;