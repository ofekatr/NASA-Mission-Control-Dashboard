import loadLaunchesModule from "@app/launches";
import loadPlanetsModule from "@app/planets";
import applyErrorHandlingMiddleware from "@infra/http/middlewares/error-handler";
import applyMorganMiddleware from "@infra/http/middlewares/morgan";
import { json, urlencoded } from "body-parser";
import express, { RequestHandler } from "express";
import path from "path";

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