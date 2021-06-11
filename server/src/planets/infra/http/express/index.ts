
import createPlanetsRouter from '@planets/infra/http/express/planets.router';
import { Express } from "express";


async function loadPlanetsApi(app: Express): Promise<Express> {
    const planetsRouter = await createPlanetsRouter();
    app.use("/planets", planetsRouter);
    return app;
}

export default loadPlanetsApi;
