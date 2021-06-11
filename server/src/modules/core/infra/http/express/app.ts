import applyErrorHandlingMiddleware from "@core/infra/http/express/middlewares/error-handler";
import applyMorganMiddleware from "@core/infra/http/express/middlewares/morgan";
import { loadLaunchApi } from "@launch";
import { loadPlanetApi } from "@planet";
import { getBasePath } from "@shared/utils/path.utils";
import { json, urlencoded } from "body-parser";
import express, { RequestHandler } from "express";
import path from "path";

function createApp() {
    const app = express();

    app.use(
        json(),
        urlencoded({
            extended: true,
        })
    );

    applyMorganMiddleware(app);

    const publicPath = path.join(getBasePath(), "public");
    app.use(express.static(publicPath));

    app.use(express.json() as RequestHandler);

    app.get("/", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    loadPlanetApi(app);
    loadLaunchApi(app);

    app.get("/*", (_req, res) => res.sendFile(path.join(publicPath, "index.html")));

    applyErrorHandlingMiddleware(app);

    return app;
}

export default createApp;