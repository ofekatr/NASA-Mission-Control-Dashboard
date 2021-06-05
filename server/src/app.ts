import loadLaunchesModule from "@launches/index";
import applyErrorHandlingMiddleware from "@middlewares/error-handler.middleware";
import applyMorganMiddleware from "@middlewares/morgan.middleware";
import loadPlanetsModule from "@planets/index";
import express, { RequestHandler } from "express";
import path from "path";
import { json, urlencoded } from "body-parser";

async function createApp() {
    const app = express();

    app.use(
        json(),
        urlencoded({
            extended: true,
        })
    );

    applyMorganMiddleware(app);

    const publicPath = path.join(__dirname, "..", "public");
    app.use(express.static(publicPath));

    app.use(express.json() as RequestHandler);

    app.get("/", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    await loadPlanetsModule(app);
    loadLaunchesModule(app);

    app.get("/*", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    applyErrorHandlingMiddleware(app);

    return app;
}

export default createApp;