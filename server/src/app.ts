import cors from "cors";
import express from "express";
import createPlanetsController from "./routes/planets/planets.controller";
import attachPlanetsRouter from "./routes/planets/planets.router";
import createPlanetsService from "./services/planets.service";

async function createApp() {
    const app = express();
    app.use(cors({
        origin: process.env.CLIENT_ENDPOINT,
    }))
    app.use(express.json());

    const planetsService = await createPlanetsService();
    const planetsController = createPlanetsController(planetsService);
    attachPlanetsRouter(app, planetsController);

    app.get("/", (_, res) => res.send("Hello World!"));
    attachPlanetsRouter(app, planetsController);

    return app;
}

export default createApp;