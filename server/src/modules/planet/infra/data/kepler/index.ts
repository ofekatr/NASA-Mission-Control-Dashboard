import createPlanetLoader from "@planet/infra/data/kepler/kepler.loader";
import assert from "assert";

const planets = [];
let isLoaded = false;

async function loadPlanets() {
    await createPlanetLoader()(planets);
    isLoaded = true;
}

function getKeplerPlanets() {
    assert(isLoaded, "Planets are not loaded");
    return planets;
}

export {
    getKeplerPlanets,
    loadPlanets,
}