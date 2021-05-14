import express from "express";
import createPlanetsController from "./routes/planets/planets.controller";
import createPlanetsRouter from "./routes/planets/planets.router";
import createPlanetsService from "./routes/planets/planets.service";
const app = express();
app.use(express.json());

const planetsService = createPlanetsService();
const planetsController = createPlanetsController(planetsService);
const planetsRouter = createPlanetsRouter(planetsController);

app.get("/", (_, res) => res.send("Hello World!"));
app.use('/planets', planetsRouter);

export default app;