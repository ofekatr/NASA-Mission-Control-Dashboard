import loadLaunchesModule from "@launches/index";
import applyErrorHandlingMiddleware from "@middlewares/error-handler.middleware";
import applyMorganMiddleware from "@middlewares/morgan.middleware";
import express, { RequestHandler } from "express";
import path from "path";
import loadPlanetsModule from "./planets";

async function createApp() {
    const app = express();

    applyMorganMiddleware(app);

    const publicPath = path.join(__dirname, "..", "public");
    app.use(express.static(publicPath));

    app.use(express.json() as RequestHandler);

    app.get("/", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    await loadPlanetsModule(app);
    loadLaunchesModule(app);

    applyErrorHandlingMiddleware(app);

    return app;
}

export default createApp;