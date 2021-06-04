import cors from "cors";
import express from "express";
import path from "path";
import loadPlanetsModule from "./planets";

async function createApp() {
    const app = express();
    app.use(cors({
        origin: process.env.CLIENT_ENDPOINT,
    }))

    const publicPath = path.join(__dirname, "..", "public");
    app.use(express.static(publicPath));

    app.use(express.json());

    app.get("/", (_, res) => res.sendFile(path.join(publicPath, "index.html")));

    await loadPlanetsModule(app);

    return app;
}

export default createApp;