import path from "path";
import cors from "cors";
import express from "express";
import createPlanetsModel from "./model/planets.model";
import createPlanetsController from "./routes/planets/planets.controller";
import attachPlanetsRouter from "./routes/planets/planets.router";
import createPlanetsService from "./services/planets.service";

async function createApp() {
    const app = express();
    app.use(cors({
        origin: process.env.CLIENT_ENDPOINT,
    }))
    const publicPath = path.join(__dirname, "..", "public");
    console.log(publicPath);
    app.use(express.static(publicPath));
    app.use(express.json());

    const planetsModel = await createPlanetsModel();
    const planetsService = createPlanetsService(planetsModel);
    const planetsController = createPlanetsController(planetsService);

    app.get("/", (_, res) => res.send("Hello World!"));
    attachPlanetsRouter(app, planetsController);

    return app;
}

export default createApp;