
import applyErrorHandlingMiddleware from "@core/infra/http/express/middlewares/error-handler";
import applyMorganMiddleware from "@core/infra/http/express/middlewares/morgan";
import loadLaunchesApi from "@launches/infra/http/express";
import loadPlanetsApi from "@planets/infra/http/express";
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

    await loadPlanetsApi(app);
    loadLaunchesApi(app);

    app.get("/*", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    applyErrorHandlingMiddleware(app);

    return app;
}

export default createApp;