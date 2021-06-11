import applyPlanetApi from "@planet/infra/http/express";
import { loadPlanets } from "@planet/infra/data/kepler";

async function loadPlanetData() {
    await loadPlanets();
}

export {
    loadPlanetData,
    applyPlanetApi,
}