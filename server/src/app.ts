import cors from "cors";
import express from "express";
import createPlanetsModel from "./models/planets.model";
import createPlanetsController from "./routes/planets/planets.controller";
import attachPlanetsRouter from "./routes/planets/planets.router";
import createPlanetsService from "./routes/planets/planets.service";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_ENDPOINT,
}))
app.use(express.json());

const planetsModel = createPlanetsModel();
const planetsService = createPlanetsService(planetsModel);
const planetsController = createPlanetsController(planetsService);
attachPlanetsRouter(app, planetsController);

app.get("/", (_, res) => res.send("Hello World!"));
attachPlanetsRouter(app, planetsController);

export default app;