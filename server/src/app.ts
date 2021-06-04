import path from "path";
import cors from "cors";
import express from "express";
import createPlanetsModel from "@planets/planets.model";
import createPlanetsController from "@planets/planets.controller";
import attachPlanetsRouter from "@planets/planets.router";
import createPlanetsService from "@planets/planets.service";

async function createApp() {
    const app = express();
    app.use(cors({
        origin: process.env.CLIENT_ENDPOINT,
    }))

    const publicPath = path.join(__dirname, "..", "public");
    app.use(express.static(publicPath));

    app.use(express.json());

    const planetsModel = await createPlanetsModel();
    const planetsService = createPlanetsService(planetsModel);
    const planetsController = createPlanetsController(planetsService);

    app.get("/", (_, res) => res.sendFile(path.join(publicPath, "index.html")));
    attachPlanetsRouter(app, planetsController);

    return app;
}

export default createApp;